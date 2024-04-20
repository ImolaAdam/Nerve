import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Subject, map } from "rxjs";
import { Letter } from "src/app/shared/models/letter.model";
import { NewEmail } from "src/app/shared/models/new-email.model";

@Injectable()
export class EmailService {
    availableEmailsChanged = new Subject<Letter[]>();
    private availableEmails: Letter[] = [];

    constructor(
        private db: AngularFirestore
    ) { }

    getAvailableEmails() {
        this.db.collection('letters')
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
                });
            }))
            .subscribe((letters: Letter[]) => {
                this.availableEmails = letters;
                this.availableEmailsChanged.next([...this.availableEmails]);
            }
        );

        // returning a copy, not reference type
        // Sort the letterList by date
        //return this.availableEmails.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
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

}