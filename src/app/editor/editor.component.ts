import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Http } from '@angular/http';
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
  readonly config: JsonEditorConfig = {
    ...environment.editorConfig // , ...mySpecificConfig
  };

  constructor(
    private route: ActivatedRoute,
    private http: Http,
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
      // TODO: Merge configuration objects, the default one and the specific
      // which consists of the domain application that comes from i.e. videos
      // and the actual record type, i.e. video, project etc.
      // We might have to do this in the resolution of the route or even
      // on the resource service which turns more to a just service for all.
      this.editorData = data.editorData;
    });
  }
}
