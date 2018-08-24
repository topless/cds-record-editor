import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { RecordService } from './shared/services/record.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  constructor(public recordService: RecordService) {}

  ngOnInit() {
    const urlPrefix = `./assets/${environment.mockDataFolder}`;
    this.recordService.getData(urlPrefix);
  }
}
