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
  editorData: EditorData;
  readonly config: JsonEditorConfig = {};
  // readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(
    private route: ActivatedRoute,
    public recordService: RecordService
  ) {}

  getRecordType(schemaUrl: string) {
    const parts: string[] = schemaUrl.split('/');
    const domain: string = parts[parts.length - 3];
    const recType: string = parts[parts.length - 2];
    return `${domain}${recType}`;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const configType = this.getRecordType(data.editorData.record.$schema);

      // NOTE: Proof of concept, when we are defining properties the editor
      // is able to render our schema and record properly
      const props = data.editorData.schema.properties;
      delete props.internal_categories;
      delete props._cds;

      // Example how to make schema explicit
      props.keywords.items.properties = { name: { type: 'string' } };
      this.editorData = data.editorData;
    });
  }
}
