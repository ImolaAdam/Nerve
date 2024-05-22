import { Injectable, OnDestroy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Subject, Subscription, map } from "rxjs";
import { Friend } from "src/app/shared/models/friend.model";
import * as DashboardActions from "../dashboard-store/dashboard.actions";
import { CreateFriendRequestDto } from "src/app/shared/dto/CreateFriendRequestDto";
import { UserDto } from "src/app/shared/dto/userDto";
import { SnackBarService } from "src/app/shared/services/snackBar.service";

@Injectable()
export class FriendService implements OnDestroy {
    friendListChanged = new Subject<void>();
    friendList: Friend[] = [];
    private subscriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private store: Store,
        private snackbarService: SnackBarService
    ) { }

    getFriendList(authUserId: string) {
        this.store.dispatch(DashboardActions.getAllFriends());
        this.store.dispatch(DashboardActions.getFriendRequests());

        this.subscriptions.push(this.db.collection('friends')
            .snapshotChanges()
            .pipe(map(docData => {
                return docData.map(doc => {
                    const data = doc.payload.doc.data() as any;
                    const id = doc.payload.doc.id;
                    data.id = id;
                    data.birthday = data.from?.toDate();

                    const friend: Friend = {
                        id: data.id,
                        friendOf: data.friendOf,
                        friendTo: data.friendTo,
                        isAccepted: data.isAccepted,
                        from: data.from
                    };

                    return {
                        ...friend
                    };
                })
            }))
            .subscribe({
                next: (friendList) => {
                    const friendRequests = friendList.filter(f => ((f.friendTo == authUserId || f.friendOf == authUserId) && (!f.isAccepted)));
                    this.store.dispatch(DashboardActions.friendRequestSet({ friendRequests }));

                    const friends = friendList.filter(f => ((f.friendTo == authUserId || f.friendOf == authUserId) && (f.isAccepted)));
                    this.store.dispatch(DashboardActions.allFriendsSet({ friends }));
                },
                error: (error) => {
                    this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                }
            })
        );

    }

    onSendNewFriendRequest(friendRequest: CreateFriendRequestDto) {
        this.db.collection('friends').add(friendRequest);
    }


    deleteFriendRequest(id: string) {
        // Get the reference to the document
        const docRef = this.db.collection('friends').doc(id);

        // Delete the document
        docRef.delete()
            .then(() => {
                //console.log("Document successfully deleted!");
            })
            .catch((error) => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            }
            );
    }

    deleteFriend(id: string) {
        // Get the reference to the document
        const docRef = this.db.collection('friends').doc(id);

        // Delete the document
        docRef.delete()
            .then(() => {
                this.snackbarService.openSnackBar('Friend deleted');
            })
            .catch((error) => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            }
            );
    }

    acceptFriendRequest(id: string) {
        const docRef = this.db.collection('friends').doc(id);

        docRef.update({ isAccepted: true })
            .then(() => {
                this.snackbarService.openSnackBar('Friend request accepted');
            })
            .catch((error) => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            }
            );
    }

    onGetAllUsers(authUserId: string) {
        this.store.dispatch(DashboardActions.getAllUsers());

        this.subscriptions.push(this.db.collection('users')
            .snapshotChanges()
            .pipe(map(docData => {
                return docData.map(doc => {
                    const data = doc.payload.doc.data() as any;
                    const id = doc.payload.doc.id;
                    data.userId = id;
                    data.birthday = data.birthday.toDate();

                    return {
                        ...data
                    };
                })
            }))
            .subscribe({
                next: (users) => {
                    //const allUsers = users.filter(u => u.id != authUserId);
                    const allUsers = users as UserDto[];
                    this.store.dispatch(DashboardActions.allUsersSet({ allUsers }));
                },
                error: (error) => {
                    this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                    this.snackbarService.openSnackBar('Something went wrong');
                }
            })
        );
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(s => {
                s.unsubscribe()
            });
        }
    }

}