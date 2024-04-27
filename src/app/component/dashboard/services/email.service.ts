import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Subject, Subscription, map } from "rxjs";
import { Letter } from "src/app/shared/models/letter.model";
import { NewEmail } from "src/app/shared/models/new-email.model";
import * as DashboardActions from "../dashboard-store/dashboard.actions";
import { Store } from "@ngrx/store";

@Injectable()
export class EmailService {
    availableEmailsChanged = new Subject<Letter[]>();
    private availableEmails: Letter[] = [];
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private store: Store
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
                console.log(error, 'error email service')
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
                console.log(error, 'error email service')
            })
        );
    }

    sendNewEmail(newEmail: NewEmail) {
        if (newEmail) {
            this.db.collection('letters').add(newEmail);
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
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                // Todo: push error to store & window popup
                console.error("Error removing document: ", error);
            }
            );
    }

    setEmailToSeen(id: string) {
        const docRef = this.db.collection('letters').doc(id);

        docRef.update({ isSeen: true })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // Todo: push error to store & window popup
                console.error("Error updating document: ", error);
            }
            );
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            sub.unsubscribe();
        })
    }
}