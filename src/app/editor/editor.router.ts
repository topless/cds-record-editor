import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { RecordResolver } from '../shared/services/record.resolver';

const editorRoutes: Routes = [
  {
    path: 'editor',
    component: EditorComponent,
    resolve: { editorData: RecordResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(editorRoutes)],
  exports: [RouterModule]
})
export class EditorRouter {}
