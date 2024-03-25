import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Friend } from 'src/app/shared/models/friend.model';

@Component({
  selector: 'app-friends-add-new-friend',
  templateUrl: './friends-add-new-friend.component.html',
  styleUrls: ['./friends-add-new-friend.component.scss']
})
export class FriendsAddNewFriendComponent implements OnInit {
  filter: string = '';
  /**
   *     id: string
    from: Date
    friendOf: string
    friendTo: string
    isAccepted: boolean
   */

  userResultList: Friend[] = [
    { id: '1', friendOf: 'orosz_krem', from: new Date(2000, 2, 10), friendTo: 'orosz_krem', isAccepted: true },
    { id: '1', friendOf: 'orosz_krem', from: new Date(2020, 2, 5), friendTo: 'orosz_krem', isAccepted: true },
    { id: '1', friendOf: 'orosz_krem', from: new Date(2020, 10, 15), friendTo: 'orosz_krem', isAccepted: true },
    { id: '1', friendOf: 'orosz_krem', from: new Date(2020, 8, 25), friendTo: 'orosz_krem', isAccepted: true },
    ];

  @Input() name: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSearchUser() {
    // Todo: get user list, search in names and username
  }

}
