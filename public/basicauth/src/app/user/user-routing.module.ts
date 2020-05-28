import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { MovielistComponent } from './movielist/movielist.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch:'full'},
  {path: 'dashboard', component: UserlistComponent },
  {path: 'movielist', component: MovielistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
