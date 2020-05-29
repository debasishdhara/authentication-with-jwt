import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubuserRoutingModule } from './subuser-routing.module';
import { MoviewatchComponent } from './moviewatch/moviewatch.component';
import { MatallModule } from '../matall/matall.module';


@NgModule({
  declarations: [MoviewatchComponent],
  imports: [
    CommonModule,
    SubuserRoutingModule,
    MatallModule
  ]
})
export class SubuserModule { }
