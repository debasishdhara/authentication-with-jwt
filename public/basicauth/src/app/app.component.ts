import { Component } from '@angular/core';

import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basicauth';
  isAuthenticated: boolean;
  constructor(public authService: AuthService) {
        this.authService.isAuthenticated.subscribe(
          (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
        );
  }
  async ngOnInit() {
        this.isAuthenticated = await this.authService.checkAuthenticated();
  }
  logout() {
        this.authService.logout('/');
      }
}
