import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Subject, Subscription, map } from "rxjs";
import { Friend } from "src/app/shared/models/friend.model";
import * as DashboardActions from "../dashboard-store/dashboard.actions";
import { CreateFriendRequestDto } from "src/app/shared/dto/CreateFriendRequestDto";

@Injectable()
export class FriendService {
    friendListChanged = new Subject<void>();
    friendList: Friend[] = [];
    private subscriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private store: Store
    ) { }

    getFriendList() {
        return this.friendList.sort((a, b) => (a.friendOf > b.friendOf) ? 1 : ((b.friendOf > a.friendOf) ? -1 : 0))

    }

    onSendNewFriendRequest(friendRequest: CreateFriendRequestDto) {
        console.log('hi')

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

    onGetAllUsers(authUserId: string) {
        console.log(authUserId)
        this.subscriptions.push(this.db.collection('users')
            .snapshotChanges()
            .pipe(map(docData => {
                return docData.map(doc => {
                    const data = doc.payload.doc.data() as any;
                    const id = doc.payload.doc.id;
                    data.id = id;
                    data.birthday = data.birthday.toDate();

                    return {
                        ...data
                    };
                })
            }))
            .subscribe({
                next: (users) => {
                    const allUsers = users.filter( u => u.id != authUserId);
                    this.store.dispatch(DashboardActions.allUsersSet({ allUsers }));
                },
                error: (error) => {
                    this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                }
            })
        );
    }
}