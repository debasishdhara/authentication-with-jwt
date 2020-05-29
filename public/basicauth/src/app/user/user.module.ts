import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserlistComponent } from './userlist/userlist.component';
import { MatallModule } from '../matall/matall.module';
import { MovieComponent } from './movie/movie.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [UserlistComponent, MovieComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatallModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class UserModule { }
