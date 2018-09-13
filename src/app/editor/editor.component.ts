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
   * @param editorData The record and the schema
   */
  cleanupProperties(editorData: any): void {
    const { record, schema } = editorData;

    if (record.hasOwnProperty('internal_categories')) {
      delete record.internal_categories;
      delete schema.properties.internal_categories;
    }

    Object.keys(record).forEach((key: string) => {
      if (key.startsWith('_cds') && record[key].hasOwnProperty('extracted_metadata')) {
        delete record[key].extracted_metadata;
        delete schema.properties[key].properties.extracted_metadata;
      }

      if (key.startsWith('_') && !key.startsWith('_cds')) {
        delete record[key];
      }
    });
    this.record = record;
    this.schema = schema;
  }

  findProblems(editorData: any): void {
    const { record, schema } = editorData;
    delete schema.required;
    // delete schema.properties;
    for (const prop of ALL_PROPS) {
      delete schema.properties[prop];
    }
    this.record = record;
    this.schema = schema;
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
        // this.cleanupProperties(data.editorData);
        this.findProblems(data.editorData);
      }
    });
  }
}

const ALL_PROPS = [
  // 'Press',
  // '_access',
  '_cds',
  // '_deposit',
  // '_files',
  // '_oai',
  // '_project_id',
  // 'accelerator_experiment',
  // 'agency_code',
  // 'audio_characteristics',
  // 'category',
  // 'contributors',
  // 'copyright',
  // 'date',
  // 'description',
  // 'doi',
  // 'duration',
  // 'external_system_identifiers',
  // 'featured'
  'internal_categories'
  // 'internal_note'
  // 'keywords'
  // 'language',
  // 'license'
  // 'location'
  // 'note'
  // 'original_source',
  // 'publication_date',
  // 'recid',
  // 'report_number',
  // 'title',
  // 'translations',
  // 'type',
  // 'vr',
  // 'physical_medium',
  // 'subject',
  // 'related_links'
];
