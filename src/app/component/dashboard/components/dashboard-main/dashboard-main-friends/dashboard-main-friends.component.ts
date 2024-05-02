import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Friend } from 'src/app/shared/models/friend.model';
import { FriendsAddNewFriendComponent } from './friends-add-new-friend/friends-add-new-friend.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FriendService } from '../../../services/friend.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { selectAllUsers, selectFriendRequests, selectFriends } from '../../../dashboard-store/dashboard.selectors';
import { UserDto } from 'src/app/shared/dto/userDto';

@Component({
  selector: 'app-dashboard-main-friends',
  templateUrl: './dashboard-main-friends.component.html',
  styleUrls: ['./dashboard-main-friends.component.scss'],
})
export class DashboardMainFriendsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  authUserId: string = '';

  allUsers: UserDto[] = [];
  friendList: Friend[] = [];
  friendRequestList: Friend[] = [];
  filter: string = '';
  filteredFriendList: Friend[] = [];
  filteredFriendRequestList: Friend[] = [];
  myFriends: UserDto[] = [];

  length = 50;
  pageSize = 10;
  pageSizeOptions = [10, 15, 25];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modalService: NgbModal,
    private friendService: FriendService,
    private store: Store
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((authUser) => {
        if (authUser?.userId) {
          this.authUserId = authUser.userId;
          this.friendService.onGetAllUsers(authUser.userId);
          this.friendService.getFriendList(this.authUserId);
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectAllUsers).subscribe((allUsers) => {
        if (allUsers) {
          this.allUsers = allUsers;
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectFriendRequests).subscribe((friendRequestList) => {
        if (friendRequestList && this.allUsers) {
          // Map through the friendRequestList and replace friendOf and friendTo with userNames
          this.friendRequestList = friendRequestList.map(friend => {
            const friendOfUser = this.allUsers.find(user => user.userId === friend.friendOf);

            return {
              ...friend,
              friendOf: friendOfUser ? friendOfUser.userName : friend.friendOf,
            };
          });
          console.log(this.friendRequestList)
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectFriends).subscribe((friends) => {
        if (friends && this.allUsers && this.authUserId) {
          this.friendList = friends.map(friend => {
            if (friend.friendOf == this.authUserId) {
              const friendToUser = this.allUsers.find(user => user.userId === friend.friendTo);

              return {
                ...friend,
                friendOf: friendToUser ? friendToUser.userName : friend.friendOf,
              };

            } else {
              const friendOfUser = this.allUsers.find(user => user.userId === friend.friendOf);
              return {
                ...friend,
                friendOf: friendOfUser ? friendOfUser.userName : friend.friendOf,
              };
            }

          });
        }
      })
    );
  }

  private createFriendRequestList(friendList: Friend[], allUsers: UserDto[]) {

  }

  onAddNewFriend(): void {
    const modalRef = this.modalService.open(FriendsAddNewFriendComponent);
    modalRef.componentInstance.name = 'World';
  }

  onDeleteFriend(id: string): void {
    //this.friendService.deleteFriend(id);
    // this.updateFriendList();
  }

  onDeleteFriendRequest(id: string): void {
    this.friendService.deleteFriendRequest(id);
    //this.updateFriendList();
  }

  // Todo: implement functionality
  onSendFriendRequest(newFriend: Friend): void {
    // this.friendService.sendFriendRequest(newFriend);
    // this.updateFriendList();
  }

  onAcceptFriendRequest(id: string) {
    this.friendService.acceptFriendRequest(id);
    //this.updateFriendList();
  }

  /* updateFriendList() {
     this.friendList = this.friendService.getFriendList();
     this.friendRequestList = this.friendList.filter(f => f.isAccepted == false);
     this.friendList = this.friendList.filter(f => f.isAccepted == true);
     this.filteredFriendList = this.friendList.slice(0, this.pageSize);
   }*/

  // Filtering the frind list based on the search input
  // It is delayed by 1 sec
  onFilterFriendList() {
    setTimeout(() => {
      console.log(this.filter);
      /*if (this.filter && this.friendList.length > 0) {
        const lowerCasedFilter = this.filter.toLocaleLowerCase();
        this.filteredFriendList = this.friendList.filter(f => {
          const fullName = `${f.givenName} ${f.familyName}`.toLocaleLowerCase();
          return fullName.includes(lowerCasedFilter);
        });
      } else {
        this.filteredFriendList = this.friendList;
      }*/
    }, 1000);
  }

  // Function to handle page change
  onPageChange(event: PageEvent) {
    this.filter = '';
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;

    // Calculate the start index based on the current page and page size
    const startIndex = event.pageIndex * event.pageSize;

    // Calculate the end index
    const endIndex = startIndex + event.pageSize;

    // Update the list of letters to display
    this.filteredFriendList = this.friendList.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((s) => {
        s.unsubscribe();
      });
    }
  }

}
