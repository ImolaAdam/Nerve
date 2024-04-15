import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Friend } from "src/app/shared/models/friend.model";

@Injectable()
export class FriendService {
    friendListChanged = new Subject<void>();
    friendList: Friend[] = [
        { id: '1', friendOf: 'orosz_krem', from: new Date(2000, 2, 10), friendTo: 'orosz_krem', isAccepted: true },
        { id: '12', friendOf: 'test', from: new Date(2020, 2, 5), friendTo: 'orosz_krem', isAccepted: false },
        { id: '13', friendOf: 'orosz_krem', from: new Date(2020, 10, 15), friendTo: 'orosz_krem', isAccepted: true },
        { id: '14', friendOf: 'dsj', from: new Date(2020, 8, 25), friendTo: 'orosz_krem', isAccepted: true },
        { id: '15', friendOf: 'oroszgf_krem', from: new Date(2000, 2, 10), friendTo: 'orosz_krem', isAccepted: false },
        { id: '16', friendOf: 'gf', from: new Date(2020, 2, 5), friendTo: 'orosz_krem', isAccepted: true },
        { id: '17', friendOf: 'orosz_krem', from: new Date(2020, 10, 15), friendTo: 'orosz_krem', isAccepted: true },
        { id: '18', friendOf: 'orosz_krem', from: new Date(2020, 8, 25), friendTo: 'orosz_krem', isAccepted: true },
        { id: '19', friendOf: 'hg', from: new Date(2000, 2, 10), friendTo: 'orosz_krem', isAccepted: true },
        { id: '10', friendOf: 'orosz_krem', from: new Date(2020, 2, 5), friendTo: 'orosz_krem', isAccepted: false },
        { id: '11', friendOf: 'orosz_krem', from: new Date(2020, 10, 15), friendTo: 'orosz_krem', isAccepted: true },
        { id: '121', friendOf: 'heidi', from: new Date(2020, 8, 25), friendTo: 'orosz_krem', isAccepted: true },
        { id: '131', friendOf: 'orosz_krem', from: new Date(2000, 2, 10), friendTo: 'orosz_krem', isAccepted: false },
        { id: '141', friendOf: 'orosz_krem', from: new Date(2020, 2, 5), friendTo: 'orosz_krem', isAccepted: true },
        { id: '151', friendOf: 'orosz_krem', from: new Date(2020, 10, 15), friendTo: 'orosz_krem', isAccepted: true },
        { id: '161', friendOf: 'orosz_krem', from: new Date(2020, 8, 25), friendTo: 'orosz_krem', isAccepted: true },
    ];

    getFriendList() {
        // returning a copy, not reference type
        // Sort the friendList by friendOf
        return this.friendList.sort((a, b) => (a.friendOf > b.friendOf) ? 1 : ((b.friendOf > a.friendOf) ? -1 : 0))

    }

    sendFriendRequest(friendRequest: Friend) {
        this.friendList.push(friendRequest);
        this.friendListChanged.next();

    }

    deleteFriend(id: string) {
        const filteredList = this.friendList.filter(l => l.id != id);
        this.friendList = filteredList;
        this.friendListChanged.next();
    }

    deleteFriendRequest(id: string) {
        this.deleteFriend(id);
    }

    acceptFriendRequest(id: string) {
        this.friendList.forEach(f => {
            if (f.id == id) {
                console.log(id)
                f.isAccepted = true;
                this.friendListChanged.next();
            }
        });
    }
}