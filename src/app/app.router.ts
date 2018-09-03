import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module.ts#EditorModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouter {}
