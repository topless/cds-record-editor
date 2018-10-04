import { Component } from '@angular/core';

@Component({
  selector: 'app-record-toolbar',
  templateUrl: './record-toolbar.component.html',
  styleUrls: ['./record-toolbar.component.scss']
})
export class RecordToolbarComponent {
  constructor() {}

  onSaveClick() {
    console.log('Broadcast an event to save the record');
  }
}
