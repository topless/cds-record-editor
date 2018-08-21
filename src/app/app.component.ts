import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import 'rxjs/add/observable/zip';

import { JsonEditorConfig } from 'ng2-json-editor';
import { environment } from '../environments/environment';
import { RecordService } from './record.service';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html',
  providers: [RecordService]
})
export class AppComponent {
  record: object;
  schema: object;
  patches: Array<any>;
  problemMap: object;
  readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(private recordService: RecordService, private http: Http) {
    const urlPrefix = `./assets/${environment.mockDataFolder}`;

    Observable.zip(
      this.http.get(`${urlPrefix}/record.json`),
      this.http.get(`${urlPrefix}/schema.json`),
      this.http.get(`${urlPrefix}/patches.json`),
      this.http.get(`${urlPrefix}/problem-map.json`),
      (recordRes, schemaRes, patchesRes, problemMapRes) => {
        return {
          record: recordRes.json(),
          schema: schemaRes.json(),
          patches: patchesRes.json(),
          problemMap: problemMapRes.json()
        };
      }
    ).subscribe(data => {
      this.record = data.record;
      this.schema = data.schema;
      this.patches = data.patches;
      this.problemMap = data.problemMap;
    });
  }
}
