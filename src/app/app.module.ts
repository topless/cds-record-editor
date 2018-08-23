import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { JsonEditorModule } from 'ng2-json-editor';
import { RecordService } from './shared/services/record.service';
import { RecordResolver } from './record.resolve.service';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: { data: RecordResolver }
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    JsonEditorModule,
    RouterModule.forRoot(appRoutes, {})
  ],
  providers: [RecordService],
  bootstrap: [AppComponent]
})
export class AppModule {}
