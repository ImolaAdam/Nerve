import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { selectAllUsers, selectFriendRequests, selectFriends } from 'src/app/component/dashboard/dashboard-store/dashboard.selectors';
import { FriendService } from 'src/app/component/dashboard/services/friend.service';
import { CreateFriendRequestDto } from 'src/app/shared/dto/CreateFriendRequestDto';
import { UserDto } from 'src/app/shared/dto/userDto';
import { Friend } from 'src/app/shared/models/friend.model';

@Component({
  selector: 'app-friends-add-new-friend',
  templateUrl: './friends-add-new-friend.component.html',
  styleUrls: ['./friends-add-new-friend.component.scss']
})
export class FriendsAddNewFriendComponent implements OnInit, OnDestroy {
  filter: string = '';
  private subscriptions: Subscription[] = [];
  private authUserId: string = '';
  value = '';

  options: UserDto[] = [];
  filteredOptions: any[] = [];
  friendRequests: Friend[] = [];
  friends: Friend[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store,
    private friendService: FriendService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((authUser) => {
        if (authUser?.userId) {
          this.friendService.onGetAllUsers(authUser.userId);
          this.authUserId = authUser.userId;
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectFriends).subscribe((friends) => {
        if(friends) {
          this.friends = friends;
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectAllUsers).subscribe((users) => {
        if (users.length != 0 && this.friendRequests && this.authUserId) {

          this.options = users.filter(u =>
            u.userId !== this.authUserId && // User ID is not the authenticated user's ID
            !this.friendRequests.some(friend => friend.friendOf === u.userId || friend.friendTo === u.userId) &&
            !this.friends.some(friend => friend.friendOf === u.userId || friend.friendTo === u.userId)
            
          );


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

    this.subscriptions.push(
      this.store.select(selectFriendRequests).subscribe((request) => {
        if (request) {
          this.friendRequests = request;
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

  onSendFriendRequest(userId: string) {
    let newFriendRequest: CreateFriendRequestDto = {
      friendOf: this.authUserId,
      friendTo: userId,
      isAccepted: false
    };

    this.friendService.onSendNewFriendRequest(newFriendRequest);
    this.filteredOptions = this.filteredOptions.filter(o => o.userId != userId);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((s) => {
        s.unsubscribe();
      })
    }
  }

}
