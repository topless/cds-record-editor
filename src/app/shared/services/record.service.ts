import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecordService {
  constructor(private http: Http) {}

  /** Switching schema url to api for CORS purposes  */
  private buildCORS(url: string): string {
    const separator = 'schemas/';
    const urlParts = url.split(separator);
    // FIXME: https -> http might not work on prod
    return `${urlParts[0].replace('https', 'http')}api/${separator}${
      urlParts[1]
    }`;
  }

  public fetchData(url: string): Observable<any> {
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
