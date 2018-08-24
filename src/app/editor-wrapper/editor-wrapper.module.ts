import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared';

import { EditorWrapperComponent } from './editor-wrapper.component';
import { EditorWrapperRouter } from './editor-wrapper.router';

@NgModule({
  declarations: [EditorWrapperComponent],
  imports: [SharedModule, EditorWrapperRouter]
})
export class EditorWrapperModule {}
