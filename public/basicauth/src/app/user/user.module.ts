import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserlistComponent } from './userlist/userlist.component';
import { MatallModule } from '../matall/matall.module';
import { MovieComponent } from './movie/movie.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MovieaddComponent } from './movieadd/movieadd.component';
import { MovieeditComponent } from './movieedit/movieedit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserlistComponent, MovieComponent, MovieaddComponent, MovieeditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatallModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
