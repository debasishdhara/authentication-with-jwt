import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private authClient ="";


  public isAuthenticated = new BehaviorSubject<boolean>(false);


  constructor(private router: Router) {

  }


  async checkAuthenticated() {

    // const authenticated = await this.authClient;
    // this.isAuthenticated.next(authenticated);

    return false;

  }


  async login(username: string, password: string) {

    const transaction = await this.signIn(username, password);


    if (transaction.status !== 'SUCCESS') {

      throw Error('We cannot handle the ' + transaction.status + ' status');

    }

    this.isAuthenticated.next(true);

    // this.authClient.session.setCookieAndRedirect(transaction.sessionToken);

  }
  signIn(username: string, password: string) {
    return {status:"SUCCESS"};
    //throw new Error("Method not implemented.");
  }


  async logout(redirect: string) {

    try {

      await this.signOut();

      this.isAuthenticated.next(false);

      this.router.navigate([redirect]);

    } catch (err) {
     console.error(err);
    }
  }
  signOut() {
    return true;
  }
}
