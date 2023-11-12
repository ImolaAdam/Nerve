import { Component, OnInit } from '@angular/core';
import { FriendDto } from 'src/app/shared/models/FriendDto';

@Component({
  selector: 'app-dashboard-main-friends',
  templateUrl: './dashboard-main-friends.component.html',
  styleUrls: ['./dashboard-main-friends.component.scss'],
})
export class DashboardMainFriendsComponent implements OnInit {
  friendList: FriendDto[] = [
    { id: '1', familyName: 'Juhasz', givenName: 'Angela', username: 'orosz_krem', from: new Date(2000, 2, 10), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Rostás', givenName: 'Babilon', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Gábor', givenName: 'Abidas', username: 'orosz_krem', from: new Date(2020, 10, 15), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Kolompár', givenName: 'Vuitton', username: 'orosz_krem', from: new Date(2020, 8, 25), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Kolompár', givenName: 'Chanel', username: 'orosz_krem', from: new Date(2020, 9, 28), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Kolompár', givenName: 'Elyza Kyra', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Rostás', givenName: 'Rákolló', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Rostás', givenName: 'Klementin', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Rostás', givenName: 'Klementina', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Rostás', givenName: 'Májkül', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: false },
    { id: '1', familyName: 'Lakatos', givenName: 'Bob', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: false },
    { id: '1', familyName: 'Lakatos', givenName: 'Migrén', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: false },
  ];
  friendRequestList: FriendDto[] = [];
  filter: string = '';
  filteredFriendList: FriendDto[] = [];
  constructor() { }

  ngOnInit() {
    if (this.friendList.length !== 0) {
      this.friendRequestList = this.friendList.filter(f => f.isAccepted == false);
      this.friendList = this.friendList.filter(f => f.isAccepted == true);
      this.filteredFriendList = this.friendList;
    }
  }

  onAddNewFriend(): void {
    console.log('add')
  }

  // Filtering the frind list based on the search input
  // It is delayed by 1 sec
  onFilterFriendList() {
    setTimeout(() => {
      console.log(this.filter);
      if (this.filter && this.friendList.length > 0) {
        const lowerCasedFilter = this.filter.toLocaleLowerCase();
        this.filteredFriendList = this.friendList.filter(f => {
          const fullName = `${f.givenName} ${f.familyName}`.toLocaleLowerCase();
          return fullName.includes(lowerCasedFilter);
        });
      } else {
        this.filteredFriendList = this.friendList;
      }
    }, 1000);
  }

}
