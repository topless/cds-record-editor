import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { RecordResolver } from '../shared/services/record.resolver';

const editorRoutes: Routes = [
  {
    path: '',
    component: EditorComponent,
    resolve: { editorData: RecordResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(editorRoutes)],
  exports: [RouterModule]
})
export class EditorRouter {}
