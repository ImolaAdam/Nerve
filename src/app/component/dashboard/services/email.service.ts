import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Subject, Subscription, map } from "rxjs";
import { Letter } from "src/app/shared/models/letter.model";
import { NewEmail } from "src/app/shared/models/new-email.model";
import * as DashboardActions from "../dashboard-store/dashboard.actions";
import { Store } from "@ngrx/store";
import { SnackBarService } from "src/app/shared/services/snackBar.service";

@Injectable()
export class EmailService {
    availableEmailsChanged = new Subject<Letter[]>();
    private availableEmails: Letter[] = [];
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private store: Store,
        private snackbarService: SnackBarService
    ) { }

    getAvailableEmails(email: string, pageName: string) {
        this.fbSubs.push(this.db.collection('letters')
            .snapshotChanges()
            .pipe(map(docData => {
                return docData.map(doc => {
                    const data = doc.payload.doc.data() as any; // Cast to Letter interface
                    const id = doc.payload.doc.id;
                    data.id = id;
                    data.sentAt = data.sentAt.toDate();

                    return {
                        ...data
                    };
                })
            }))
            .subscribe((letters: Letter[]) => {
                //.filter((letter: Letter) => letter.sentTo === email);
                if (pageName == 'Inbox') {
                    let inbox = letters.filter((l) => l.sentTo == email);
                    this.store.dispatch(DashboardActions.setInboxLetterList({ letterList: inbox }));
                } else if (pageName == 'Sent') {
                    let sent = letters.filter((l) => l.sentBy == email);
                    this.store.dispatch(DashboardActions.setSentLetterList({ letterList: sent }));
                }
            }, error => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            })
        );
    }

    getSentEmails(email: string) {
        this.fbSubs.push(this.db.collection('letters')
            .snapshotChanges()
            .pipe(map(docData => {
                return docData.map(doc => {
                    const data = doc.payload.doc.data() as any; // Cast to Letter interface
                    const id = doc.payload.doc.id;
                    data.id = id;
                    data.sentAt = data.sentAt.toDate();

                    return {
                        ...data
                    };
                }).filter((letter: Letter) => letter.sentBy === email);
            }))
            .subscribe((letters: Letter[]) => {
                this.availableEmails = letters;
                this.availableEmailsChanged.next([...this.availableEmails]);
            }, error => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            })
        );
    }

    sendNewEmail(newEmail: NewEmail) {
        if (newEmail) {
            this.db.collection('letters').add(newEmail);
            this.snackbarService.openSnackBar('Email sent');
        }
    }

    /**
     * 
     * @param letterId = in firestore the document's automatically generated id
     */
    deleteEmail(letterId: string) {
        // Get the reference to the document
        const docRef = this.db.collection('letters').doc(letterId);

        // Delete the document
        docRef.delete()
            .then(() => {
                this.snackbarService.openSnackBar('Letter deleted');
            })
            .catch((error) => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            }
            );
    }

    setEmailToSeen(id: string) {
        const docRef = this.db.collection('letters').doc(id);

        docRef.update({ isSeen: true })
            .then(() => {
                //console.log("Document successfully updated!");
            })
            .catch((error) => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            }
            );
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            sub.unsubscribe();
        })
    }
}