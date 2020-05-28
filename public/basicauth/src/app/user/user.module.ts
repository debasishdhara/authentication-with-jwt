import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserlistComponent } from './userlist/userlist.component';
import { MovielistComponent } from './movielist/movielist.component';
import { MatallModule } from '../matall/matall.module';

@NgModule({
  declarations: [UserlistComponent, MovielistComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatallModule
  ]
})
export class UserModule { }
