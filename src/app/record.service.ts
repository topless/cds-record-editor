import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';

import 'rxjs/add/observable/zip';

import { JsonEditorConfig } from 'ng2-json-editor';
import { environment } from '../environments/environment';

interface InvenioRecord {
  metadata?: {
    $schema?: string;
  };
}

interface ProblemMap {
  string?: [
    {
      message?: string;
      type?: string;
    }
  ];
}

@Injectable()
export class RecordService {
  record: InvenioRecord;
  schema: object;
  patches: Array<any>;
  problemMap: ProblemMap;
  readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(private http: Http) {}

  // FIXME: This is only for testing purposes till its fixed on videos.
  private buildCORS(url): string {
    const separator = '.cern.ch/';
    const urlParts = url.split(separator);
    return `${urlParts[0]}${separator}api/${urlParts[1]}`;
  }

  // NOTE: A sample url to start toying with real records
  // http.get('https://videos.cern.ch/api/record/2633386'),
  public getData(urlPrefix): void {
    // .get(`${urlPrefix}/record.json`)
    this.http
      .get('https://videos.cern.ch/api/record/2633386')
      .subscribe(recordRes => {
        this.record = recordRes.json();
        this.http
          .get(this.buildCORS(this.record.metadata.$schema))
          .subscribe(schemaRes => {
            this.schema = schemaRes.json();
          });
      });

    Observable.zip(
      this.http.get(`${urlPrefix}/patches.json`),
      this.http.get(`${urlPrefix}/problem-map.json`),
      (patchesRes, problemMapRes) => {
        return {
          patches: patchesRes.json(),
          problemMap: problemMapRes.json()
        };
      }
    ).subscribe(data => {
      this.patches = data.patches;
      this.problemMap = data.problemMap;
    });
  }
}
