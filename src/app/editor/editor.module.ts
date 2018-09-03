import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { EditorRouter } from './editor.router';
import { EditorComponent } from './editor.component';

@NgModule({
  imports: [SharedModule, EditorRouter],
  declarations: [EditorComponent]
})
export class EditorModule {}
