import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Friend } from 'src/app/shared/models/friend.model';
import { FriendsAddNewFriendComponent } from './friends-add-new-friend/friends-add-new-friend.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard-main-friends',
  templateUrl: './dashboard-main-friends.component.html',
  styleUrls: ['./dashboard-main-friends.component.scss'],
})
export class DashboardMainFriendsComponent implements OnInit {
  friendList: Friend[] = [
    { id: '1', friendOf: 'orosz_krem', from: new Date(2000, 2, 10), friendTo: 'orosz_krem', isAccepted: true },
    { id: '1', friendOf: 'orosz_krem', from: new Date(2020, 2, 5), friendTo: 'orosz_krem', isAccepted: true },
    { id: '1', friendOf: 'orosz_krem', from: new Date(2020, 10, 15), friendTo: 'orosz_krem', isAccepted: true },
    { id: '1', friendOf: 'orosz_krem', from: new Date(2020, 8, 25), friendTo: 'orosz_krem', isAccepted: true },];
  friendRequestList: Friend[] = [];
  filter: string = '';
  filteredFriendList: Friend[] = [];
  length = 50;
  pageSize = 10;
  pageSizeOptions = [10, 15, 25];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (this.friendList.length !== 0) {
      this.friendRequestList = this.friendList.filter(f => f.isAccepted == false);
      this.friendList = this.friendList.filter(f => f.isAccepted == true);
      this.filteredFriendList = this.friendList.slice(0, this.pageSize);
    }
  }

  onAddNewFriend(): void {
    console.log('add')
    const modalRef = this.modalService.open(FriendsAddNewFriendComponent);
    modalRef.componentInstance.name = 'World';
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


}
