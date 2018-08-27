import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecordService } from '../shared/services/record.service';
import { EditorData } from '../shared/interfaces/editor-data.model';
import { JsonEditorConfig } from 'ng2-json-editor';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-editor-wrapper',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'editor-wrapper.component.html',
  providers: []
})
export class EditorWrapperComponent implements OnInit {
  editorData: EditorData;
  readonly config: JsonEditorConfig = {
    ...environment.editorConfig // , ...mySpecificConfig
  };

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
      // TODO: Merge configuration objects, the default one and the specific
      // which consists of the domain application that comes from i.e. videos
      // and the actual record type, i.e. video, project etc.
      // We might have to do this in the resolution of the route or even
      // on the resource service which turns more to a just service for all.
      this.editorData = data.editorData;
    });
  }
}
