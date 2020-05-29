import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../user/user';
import { CanActivate ,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate{

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAdmin = new BehaviorSubject<boolean>(false);
  public isUser = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
   }
   canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthenticated();
   }
   public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}api/login`, { email, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isAuthenticated.next(true);
            if(user.result.user_details.roles[0].role_type == "ADMIN"){
              this.isAdmin.next(true);
            }
            if(user.result.user_details.roles[0].role_type == "USER"){
              this.isUser.next(true);
            }
            return user;
        }));
  }
  logout() {
    // remove user from local storage to log user out
    this.signOut();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticated.next(false);
    this.isAdmin.next(false);
    this.isUser.next(false);
    return true;
  }
  signOut(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    // return userjson.result.token_type;
    const headers = headerDict;
    return this.http.post(`${environment.apiUrl}api/logout`,{},{ headers }).pipe(map(res=>{
      if(res)
        return true;
      return false;
    }));
  }
  checkAuthenticated(){
    const userdetails = localStorage.getItem('currentUser');
    const userjson =JSON.parse(userdetails);
    const res =userjson?userjson.result.token_type:"";
    const resto =userjson?userjson.result.access_token:"";
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization':res+" "+resto
    }
    // return userjson.result.token_type;
    const headers = headerDict;
    return this.http.post(`${environment.apiUrl}api/me`,{},{ headers }).pipe(map(res=>{
      if(res)
        return true;
      return false;
    }));
  }
}
