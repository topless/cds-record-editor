import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditorWrapperComponent } from './editor-wrapper.component';
import { RecordResolver } from '../shared/services/record.resolver';

const editorWrapperRoutes: Routes = [
  {
    path: 'editor',
    component: EditorWrapperComponent,
    resolve: { editorData: RecordResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(editorWrapperRoutes)],
  exports: [RouterModule]
})
export class EditorWrapperRouter {}
