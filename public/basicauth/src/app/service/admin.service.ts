import { Injectable } from '@angular/core';
import { CanActivate ,ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate{

  constructor(private http: HttpClient,private router:Router,private loginservice:LoginService) { }
  public isAdmin = new BehaviorSubject<boolean>(false);
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.checkAdmin()) {
        this.loginservice.logout();
        this.router.navigate(['login']);
        return false;
      }
    this.isAdmin.next(true);
    return true;
   }
   public isLoggedIn(){
     const user=localStorage.getItem('currentUser');
     if(user !== null){
      const userjson =JSON.parse(user);
      const res =userjson?userjson.result.user_details.roles[0].role_type:"";
      if(res=="ADMIN"){ 
        return true;
      }
      return false;
     }
    return false;
  }
  checkAdmin(): boolean {
    return this.isLoggedIn();
  }
}
