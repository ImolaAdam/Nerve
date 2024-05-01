import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { selectAllUsers } from 'src/app/component/dashboard/dashboard-store/dashboard.selectors';
import { FriendService } from 'src/app/component/dashboard/services/friend.service';
import { UserDto } from 'src/app/shared/dto/userDto';

@Component({
  selector: 'app-friends-add-new-friend',
  templateUrl: './friends-add-new-friend.component.html',
  styleUrls: ['./friends-add-new-friend.component.scss']
})
export class FriendsAddNewFriendComponent implements OnInit, OnDestroy {
  filter: string = '';
  private subscriptions: Subscription[] = [];
  value = '';

  options: UserDto[] = [];
  filteredOptions: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store,
    private friendService: FriendService
  ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((authUser) => {
        if (authUser?.userId) {
          this.friendService.onGetAllUsers(authUser.userId);
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectAllUsers).subscribe((users) => {
        if (users.length != 0) {
          this.options = users;

          this.filteredOptions = this.options.map(user => {
            const { birthday, ...rest } = user; // Destructure birthday and rest of the properties
            const formattedBirthday = birthday instanceof Date ? birthday.toLocaleDateString('en-GB') : birthday;
            return {
              ...rest, // Spread the rest of the properties
              birthday: formattedBirthday // Assign the formatted birthday
            };
          });
        }
      })
    );
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.userName.toLowerCase().includes(this.value.toLowerCase())
    );

    this.filteredOptions = this.filteredOptions.map(user => {
      const { birthday, ...rest } = user; // Destructure birthday and rest of the properties
      const formattedBirthday = birthday instanceof Date ? birthday.toLocaleDateString('en-GB') : birthday;
      return {
        ...rest, // Spread the rest of the properties
        birthday: formattedBirthday // Assign the formatted birthday
      };
    });
  }

  clearInput() {
    this.value = '';
    this.filteredOptions = this.options.map(user => {
      const { birthday, ...rest } = user; // Destructure birthday and rest of the properties
      const formattedBirthday = birthday instanceof Date ? birthday.toLocaleDateString('en-GB') : birthday;
      return {
        ...rest, // Spread the rest of the properties
        birthday: formattedBirthday // Assign the formatted birthday
      };
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((s) => {
        s.unsubscribe();
      })
    }
  }

}
