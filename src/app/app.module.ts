import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SHARED_SERVICES } from './shared/services';

import { AppRouter } from './app.router';
import { SharedModule } from './shared';
import { EditorModule } from './editor/editor.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    AppRouter,
    SharedModule,
    EditorModule
  ],
  providers: SHARED_SERVICES,
  bootstrap: [AppComponent]
})
export class AppModule {}
