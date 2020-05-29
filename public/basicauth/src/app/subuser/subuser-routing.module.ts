import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviewatchComponent } from './moviewatch/moviewatch.component';


const routes: Routes = [
  {path: '', redirectTo: 'watchmovies', pathMatch:'full'},
  {path: 'watchmovies', component: MoviewatchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubuserRoutingModule { }
