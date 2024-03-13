import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/component/authentication/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email: string = '';
  password: string = '';
  userName: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      role: 'Beginner',
      birtday: form.value.birtday,
      userName: 'bitvh',
      authUserId: Math.round(Math.random() * 1000).toString()
    });
    /* if (this.email == '') {
       alert('Please enter email');
       return;
     }
 
     if (this.password == '') {
       alert('Please enter password');
       return;
     }
 
    // this.auth.register(this.email, this.password)
     this.email = '';
     this.password = '';*/
  }
}
