import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/component/authentication/auth.service';
import { UserRank } from 'src/app/shared/enums/user-rank.enum';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(
    private authService: AuthService
  ) { }

  register(form: NgForm) {

    let newUser: User = {
      email: form.value.email,
      password: form.value.password,
      role: UserRank.Beginner,
      birthday: form.value.birthday,
      userName: form.value.userName
    };

    this.authService.registerUser(newUser);
  }

}