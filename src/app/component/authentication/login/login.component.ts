import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/component/authentication/auth.service';
import * as AuthActions from '../auth-store/auth.actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) form?: NgForm;

  constructor(
    private authService: AuthService,
    private store: Store
  ) { }

  ngOnInit(): void { }

  login(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
    /*  if (!!this.form) {
        const { email, password } = this.form.value;
        console.log(this.form.value)
        if (email == '') {
          alert('Please enter email');
          return;
        }
  
        if (password == '') {
          alert('Please enter password');
          return;
        }
  
        //this.auth.login(email, password)
        this.store.dispatch(AuthActions.firebaseLoginStart({ email, password }));
      }*/
  }
}
