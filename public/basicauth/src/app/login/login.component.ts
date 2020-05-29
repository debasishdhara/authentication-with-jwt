import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService:LoginService,
  ) {
  }
  async ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/user';
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    await this.loginService.checkAuthenticated().subscribe(res=>{
      if (res) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        await this.loginService.login(username, password).subscribe(
          res => {
            this.router.navigate(['user']);
          },
          err => {
              
          }
      );
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
