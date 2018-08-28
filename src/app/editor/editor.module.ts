import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared';

import { EditorComponent } from './editor.component';
import { EditorRouter } from './editor.router';

@NgModule({
  declarations: [EditorComponent],
  imports: [SharedModule, EditorRouter]
})
export class EditorModule {}
