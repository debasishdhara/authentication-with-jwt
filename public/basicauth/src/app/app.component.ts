import { Component } from '@angular/core';

import { LoginService } from './login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './service/admin.service';
import { UserService } from './service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basicauth';
  isAuthenticated: boolean;
  isAdmin:boolean;
  isUser:boolean;
  constructor(public loginService: LoginService,public userService:UserService,public adminService: AdminService,private route: ActivatedRoute,private router: Router) {
        this.loginService.isAuthenticated.subscribe(
          (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
        );
        this.loginService.isAdmin.subscribe(
          (isAdmin: boolean)  => this.isAdmin = isAdmin
        );
        this.loginService.isUser.subscribe(
          (isUser: boolean)  => this.isUser = isUser
        );
  }
  async ngOnInit() {
        await this.loginService.checkAuthenticated().subscribe(
          res => {
            this.isAuthenticated = res;
          }
        );

        this.isAdmin = this.adminService.checkAdmin();
        this.isUser = this.userService.checkUser();
  }
  logout() {
        this.loginService.logout();
        this.router.navigate(["/"]);
      }
}
