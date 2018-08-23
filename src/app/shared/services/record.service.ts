import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';

import 'rxjs/add/observable/zip';
import { Record } from '../interfaces/record.model';
import { ProblemMap } from '../interfaces/problem-map.model';

import { JsonEditorConfig } from 'ng2-json-editor';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecordService {
  record: Record;
  schema: object;
  patches: Array<any>;
  problemMap: ProblemMap;
  readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(private http: Http) {}

  // FIXME: This is only for dev purposes till its fixed on videos.
  private buildCORS(url): string {
    const separator = 'schemas/';
    const urlParts = url.split(separator);
    return `${urlParts[0].replace('https', 'http')}api/${separator}${
      urlParts[1]
    }`;
  }

  // http.get('https://localhost.cern.ch:5000/api/record/2'),
  public getData(url): void {
    this.http
      .get(url)
      .toPromise()
      .then(recordRes => {
        this.record = recordRes.json();
        this.http
          .get(this.buildCORS(this.record.metadata.$schema))
          .toPromise()
          .then(schemaRes => {
            this.schema = schemaRes.json();
          });
      });
  }
}
