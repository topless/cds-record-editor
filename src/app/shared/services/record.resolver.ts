import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RecordService } from './record.service';
import { EditorData } from '../../shared/interfaces/editor-data.model';

@Injectable()
export class RecordResolver implements Resolve<any> {
  constructor(private recordService: RecordService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EditorData> {
    const apiUrl = 'http://127.0.0.1:5000/api/record/2';
    return this.recordService.getData(apiUrl);
  }
}
