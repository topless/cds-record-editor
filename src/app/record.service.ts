import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RecordService {
  constructor(private http: Http) {}

  // NOTE: A sample url to start toying with real records
  // http.get('https://videos.cern.ch/api/record/2633386'),
  getRecord(url): object {
    return this.http.get(url);
  }
}
