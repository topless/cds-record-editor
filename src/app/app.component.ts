import { Component, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';

import { JsonEditorConfig } from 'ng2-json-editor';
import { environment } from '../environments/environment';

@Component({
  // tslint:disable-next-line
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html'
})
export class AppComponent {
  record: object;
  schema: object;
  patches: Array<any>;
  problemMap: object;
  readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(private http: Http) {
    Observable.zip(
      this.http.get(`./assets/${environment.mockDataFolder}/record.json`),
      this.http.get(`./assets/${environment.mockDataFolder}/schema.json`),
      this.http.get(`./assets/${environment.mockDataFolder}/patches.json`),
      this.http.get(`./assets/${environment.mockDataFolder}/problem-map.json`),
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
