import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HackerListComponent } from './hacker-list/hacker-list.component';

const routes: Routes = [
  {
    path: '',
    component: HackerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
