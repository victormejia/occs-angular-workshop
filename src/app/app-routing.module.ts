import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HackerListComponent } from './hacker-list/hacker-list.component';
import { HackerDetailComponent } from './hacker-detail/hacker-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HackerListComponent
  },
  {
    path: 'hackers/:id',
    component: HackerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
