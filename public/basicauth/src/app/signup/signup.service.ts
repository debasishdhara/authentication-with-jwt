import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient,public loginService:LoginService) { }
  register(users){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    // return userjson.result.token_type;
    const headers = headerDict;
    return this.http.post<any>(`${environment.apiUrl}api/register`, users,{headers})
        .pipe(map(user => {localStorage.setItem('currentUser', JSON.stringify(user));
        this.loginService.isAuthenticated.next(true);
        if(user.result.user_details.roles[0].role_type == "ADMIN"){
          this.loginService.isAdmin.next(true);
        }
        if(user.result.user_details.roles[0].role_type == "USER"){
          this.loginService.isUser.next(true);
        }
        return user;
      }));
  }
}
