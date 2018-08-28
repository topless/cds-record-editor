import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';

import { JsonEditorConfig } from 'ng2-json-editor';
import { Record, ProblemMap } from '../interfaces';

import { environment } from '../../../environments/environment';

@Injectable()
export class RecordService {
  constructor(private http: Http) {}

  // FIXME: This is only for dev purposes till its fixed on videos.
  private buildCORS(url: string): string {
    const separator = 'schemas/';
    const urlParts = url.split(separator);
    return `${urlParts[0].replace('https', 'http')}api/${separator}${
      urlParts[1]
    }`;
  }

  public getData(url: string): Observable<any> {
    return this.http
      .get(url)
      .map((recordRes: any) => recordRes.json())
      .flatMap((record: any) => {
        return this.http
          .get(this.buildCORS(record.metadata.$schema))
          .map((schemaRes: any) => ({
            record: record.metadata,
            schema: schemaRes.json(),
            problemMap: [],
            patches: {}
          }));
      });
  }
}
