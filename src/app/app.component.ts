import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RecordService } from './record.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html',
  providers: [RecordService]
})
export class AppComponent implements OnInit {
  constructor(public recordService: RecordService) {}
  public ngOnInit() {
    const urlPrefix = `./assets/${environment.mockDataFolder}`;
    this.recordService.getData(urlPrefix);
  }
}
