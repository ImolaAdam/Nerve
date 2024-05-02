import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { AuthService } from 'src/app/component/authentication/auth.service';
import { UserDto } from 'src/app/shared/dto/userDto';

@Component({
  selector: 'app-dashboard-main-settings',
  templateUrl: './dashboard-main-settings.component.html',
  styleUrls: ['./dashboard-main-settings.component.scss'],
})
export class DashboardMainSettingsComponent implements OnInit, OnDestroy {
  model!: NgbDateStruct;
  authUser!: UserDto;

  newUserName: string = '';
  newBirthday!: Date | Timestamp;

  private subscriptions: Subscription[] = [];
  private authUserId = '';

  constructor(
    private store: Store,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((authUser) => {
        if(authUser?.userId) {
          this.authUser = authUser;
          this.newUserName = authUser.userName;
          this.newBirthday = authUser.birthday;
          this.authUserId = authUser.userId;
        }
      })
    );
  }

  onProfileUpdate(f: NgForm) {
    this.authService.onUpdateUserData(this.authUserId, this.authUser.email, this.newUserName, this.newBirthday);
  }

  onPasswordUpdate(f: NgForm) {
    this.authService.onChangeUserPassword(f.value.password, this.authUserId);
    f.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((s) => {
        s.unsubscribe();
      });
    }
  }
}
