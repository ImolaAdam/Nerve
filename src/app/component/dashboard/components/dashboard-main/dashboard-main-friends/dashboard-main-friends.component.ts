import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Friend } from 'src/app/shared/models/friend.model';
import { FriendsAddNewFriendComponent } from './friends-add-new-friend/friends-add-new-friend.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FriendService } from '../../../services/friend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-main-friends',
  templateUrl: './dashboard-main-friends.component.html',
  styleUrls: ['./dashboard-main-friends.component.scss'],
})
export class DashboardMainFriendsComponent implements OnInit, OnDestroy {
  private friendServiceSub: Subscription | undefined;

  friendList: Friend[] = [];
  friendRequestList: Friend[] = [];
  filter: string = '';
  filteredFriendList: Friend[] = [];
  length = 50;
  pageSize = 10;
  pageSizeOptions = [10, 15, 25];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modalService: NgbModal,
    private friendService: FriendService
  ) { }

  ngOnInit() {
    this.friendList = this.friendService.getFriendList();

    if (this.friendList.length !== 0) {
      this.friendRequestList = this.friendList.filter(f => f.isAccepted == false);
      this.friendList = this.friendList.filter(f => f.isAccepted == true);
      this.filteredFriendList = this.friendList.slice(0, this.pageSize);
    }

    this.friendServiceSub = this.friendService.friendListChanged.subscribe(() => {
      this.updateFriendList();
    });
  }

  onAddNewFriend(): void {
    console.log('add')
    const modalRef = this.modalService.open(FriendsAddNewFriendComponent);
    modalRef.componentInstance.name = 'World';
  }

  onDeleteFriend(id: string): void {
    //this.friendService.deleteFriend(id);
   // this.updateFriendList();
  }

  onDeleteFriendRequest(id: string): void {
    this.friendService.deleteFriendRequest(id);
    this.updateFriendList();
  }

  // Todo: implement functionality
  onSendFriendRequest(newFriend: Friend): void {
   // this.friendService.sendFriendRequest(newFriend);
   // this.updateFriendList();
  }

  onAcceptFriendRequest(id: string) {
    this.friendService.acceptFriendRequest(id);
    this.updateFriendList();
  }

  updateFriendList() {
    this.friendList = this.friendService.getFriendList();
    this.friendRequestList = this.friendList.filter(f => f.isAccepted == false);
    this.friendList = this.friendList.filter(f => f.isAccepted == true);
    this.filteredFriendList = this.friendList.slice(0, this.pageSize);
  }

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
    this.friendServiceSub?.unsubscribe();
  }

}
