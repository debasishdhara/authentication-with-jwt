import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Userdetails } from '../user/user';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  signupInvalid: boolean;
  formSubmitAttempt: boolean;
  user: Userdetails;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private signupService:SignupService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    }, { 
      validator: this.ConfirmedValidator('password', 'confirm_password')
    });
  }
  get f(){
    return this.form.controls;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  async onSubmit() {
    this.signupInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const name = this.form.get('name').value;
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        const confirm_password = this.form.get('confirm_password').value;
        const phone = this.form.get('phone').value;
        // this.user.email=username;
        // this.user.name=name;
        // this.user.password=password;
        // this.user.password_confirmation=confirm_password;
        // this.user.phone=phone;
        const userdetails = {
          email:username,
          name:name,
          password:password,
          password_confirmation:confirm_password,
          phone:phone
        };
        console.log(userdetails)
        await this.signupService.register(userdetails).subscribe(
          res => {
            this.router.navigate(['user']);
          },
          err => {
              console.log(err)
          });
      } catch (err) {
        this.signupInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
