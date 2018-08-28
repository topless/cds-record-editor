import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RecordService } from './record.service';
import { RecordMockService } from './record.mock.service';
import { EditorData } from '../../shared/interfaces/editor-data.model';

@Injectable()
export class RecordResolver implements Resolve<any> {
  constructor(
    private recordService: RecordService,
    private recordMockService: RecordMockService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EditorData> {
    const apiUrl = 'http://127.0.0.1:5000/api/record/2';
    return this.recordService.getData(apiUrl);
    // NOTE: Mock service will be used for dev purposes, when we setup the editor
    // with our data will be removed.
    // return this.recordMockService.getMockData();
  }
}
