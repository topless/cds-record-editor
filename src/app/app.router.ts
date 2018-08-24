import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RecordResolver } from './shared/services/record.resolver';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: { data: RecordResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouter {}
