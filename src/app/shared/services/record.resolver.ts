import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RecordService } from './record.service';

@Injectable()
export class RecordResolver implements Resolve<any> {
  constructor(private recordService: RecordService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const url = 'http://127.0.0.1:5000/api/record/2';
    console.log('It should have resolved');
    // return this.recordService.getData(url).then(data => data);
  }
}
