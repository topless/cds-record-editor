import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { EditorComponent } from './editor.component';

@NgModule({
  imports: [SharedModule],
  declarations: [EditorComponent]
})
export class EditorModule {}
