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
  // readonly config: JsonEditorConfig = environment.editorConfig;
  readonly config = {};

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

  // Problematic fields that crash the editor

  // keywords: tempProps.keywords,
  // internal_categories: tempProps.internal_categories,
  // _cds: tempProps._cds,

  // NOTE: Fields to check
  ngOnInit() {
    this.route.data.subscribe(data => {
      const configType = this.getRecordType(data.editorData.record.$schema);
      // FIXME: JSON Schema validator results
      // www.jsonschemavalidator.net
      // Required properties are missing from object: recid, title,
      // publication_date, contributors, report_number, category, type.

      // NOTE: It looks like the following fields are the ones which are not
      // defined properly in schema.
      delete data.editorData.schema.keywords;
      delete data.editorData.schema.internal_categories;
      delete data.editorData.schema._cds;

      const tempProps = data.editorData.schema.properties;

      data.editorData.schema.properties = {
        videos: tempProps.videos,
        report_number: tempProps.report_number,
        _access: tempProps._access,
        subject: tempProps.subject,
        category: tempProps.category,
        contributors: tempProps.contributors,
        title: tempProps.title,
        note: tempProps.note,
        type: tempProps.type,
        _oai: tempProps._oai,
        description: tempProps.description,
        translations: tempProps.translations,
        date: tempProps.date,
        publication_date: tempProps.publication_date,
        internal_note: tempProps.internal_note,
        doi: tempProps.doi,
        license: tempProps.license,
        recid: tempProps.recid,
        agency_code: tempProps.agency_code,
        original_source: tempProps.original_source,
        _deposit: tempProps._deposit
      };

      this.editorData = data.editorData;
    });
  }
}
