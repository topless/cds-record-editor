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
    // const apiUrl = 'http://127.0.0.1:5000/api/record/2';
    if (!route.queryParams.url) {
      return this.recordMockService.getMockData();
    }
    return this.recordService.getData(route.queryParams.url);
  }
}
