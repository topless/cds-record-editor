import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';

import { RecordService } from '../shared/services/record.service';
import { EditorData } from '../shared/interfaces/editor-data.model';
import { JsonEditorConfig } from 'ng2-json-editor';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-editor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'editor.component.html',
  providers: []
})
export class EditorComponent implements OnInit {
  record: object;
  schema: object;
  readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(private route: ActivatedRoute, public recordService: RecordService) {}

  /**
   * Removes properties whose name starts with underscore. Usually these
   * are auto generated and we don't want to edit them. They might also
   * NOT be explicitly defined in the schema.
   * @param rec Our record object
   */
  cleanupProperties(rec: any): any {
    if (rec.hasOwnProperty('internal_categories')) {
      delete rec.internal_categories;
    }
    Object.keys(rec).forEach((key: string) => {
      if (key.startsWith('_cds') && rec[key].hasOwnProperty('extracted_metadata')) {
        delete rec[key].extracted_metadata;
      }
      if (key.startsWith('_') && !key.startsWith('_cds')) {
        delete rec[key];
      }
    });
    return rec;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (!this.route.snapshot.queryParams.hasOwnProperty('url')) {
        // We render the mock data
        this.record = data.editorData.record;
        this.schema = data.editorData.schema;
        // this.patches = data.editorData.patches;
        // this.problemMap = data.editorData.problemMap;
      } else {
        // TODO: Whenever we removed something from the record the change has to be
        // reflected also in the schema.
        this.record = this.cleanupProperties(data.editorData.record);
        delete data.editorData.schema.properties._cds.properties.extracted_metadata;
        this.schema = data.editorData.schema;
      }
    });
  }
}
