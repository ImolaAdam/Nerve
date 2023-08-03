import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/component/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) form?: NgForm;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (!!this.form) {
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

      this.auth.login(email, password)
    }
  }
}
