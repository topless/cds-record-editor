import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRouter } from './app.router';

import { SharedModule } from './shared';
import { SHARED_SERVICES } from './shared/services';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule, AppRouter, SharedModule],
  providers: SHARED_SERVICES,
  bootstrap: [AppComponent]
})
export class AppModule {}
