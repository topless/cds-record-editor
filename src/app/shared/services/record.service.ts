import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecordService {
  record_url: string;
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

  public postData(record) {
    console.log('Saving data', this.record_url);
    const token = document.getElementsByName('authorized_token');
    const options = {
      headers: new Headers({
        'Authorization': 'Bearer ' + token[0],
        'Content-Type': 'application/json'
      })
    };
    this.http.put(this.record_url, record, options)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured: ', err);
      }
    );
  }

  public fetchData(url: string): Observable<any> {
    this.record_url = url;
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
