import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginService } from './login/login.service';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user',canActivate:[LoginService], loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  {path: 'subuser',canActivate:[LoginService], loadChildren:()=>import('./subuser/subuser.module').then(m=>m.SubuserModule)},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
