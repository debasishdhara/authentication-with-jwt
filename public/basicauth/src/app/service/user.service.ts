import { Injectable } from '@angular/core';
import { CanActivate ,ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{

  constructor(private http: HttpClient,private router:Router,private loginservice:LoginService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.checkUser()) {
        this.loginservice.logout();
        this.router.navigate(['login']);
        return false;
      }
    return true;
   }
   public isLoggedIn(){
     const user=localStorage.getItem('currentUser');
     if(user !== null){
      const userjson =JSON.parse(user);
      const res =userjson?userjson.result.user_details.roles[0].role_type:"";
      if(res=="USER"){
        return true;
      }
      return false;
     }
    return false;
  }
  checkUser(): boolean {
    return this.isLoggedIn();
  }
}
