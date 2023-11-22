import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FriendDto } from 'src/app/shared/models/FriendDto';

@Component({
  selector: 'app-friends-add-new-friend',
  templateUrl: './friends-add-new-friend.component.html',
  styleUrls: ['./friends-add-new-friend.component.scss']
})
export class FriendsAddNewFriendComponent implements OnInit {
  filter: string = '';

  userResultList: FriendDto[] = [
    { id: '1', familyName: 'Juhasz', givenName: 'Angela', username: 'orosz_krem', from: new Date(2000, 2, 10), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Rostás', givenName: 'Babilon', username: 'orosz_krem', from: new Date(2020, 2, 5), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Gábor', givenName: 'Abidas', username: 'orosz_krem', from: new Date(2020, 10, 15), birthday: new Date(2000, 2, 10), isAccepted: true },
    { id: '1', familyName: 'Kolompár', givenName: 'Vuitton', username: 'orosz_krem', from: new Date(2020, 8, 25), birthday: new Date(2000, 2, 10), isAccepted: true },
    ];

  @Input() name: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSearchUser() {
    // Todo: get user list, search in names and username
  }

}
