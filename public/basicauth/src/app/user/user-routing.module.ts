import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AdminService } from '../service/admin.service';
import { MovieComponent } from './movie/movie.component';
import { MovieaddComponent } from './movieadd/movieadd.component';
import { MovieeditComponent } from './movieedit/movieedit.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch:'full'},
  {path: 'dashboard', component: UserlistComponent },
  {path: 'movielist',canActivate:[AdminService], component: MovieComponent},
  {path: 'moviecreate',canActivate:[AdminService], component: MovieaddComponent},
  {path: 'movieedit',canActivate:[AdminService], component: MovieeditComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
