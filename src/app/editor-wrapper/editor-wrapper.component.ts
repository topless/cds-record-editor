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
  readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(
    private route: ActivatedRoute,
    public recordService: RecordService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.editorData = data.editorData;
    });
  }
}
