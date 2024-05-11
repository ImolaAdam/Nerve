import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { CreateCalendarEventDto } from "src/app/shared/dto/CreateCalendarEventDto";

export type durationDto = {
    minutesStudied: number;
    userId: string;
};

@Injectable()
export class CalendarService {
    private subscriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private store: Store
    ) { }

    createNewEvents(newEvents: CreateCalendarEventDto[], sumOfMinutes: number) {
        if (newEvents.length != 0) {
            newEvents.forEach((event) => {
                this.db.collection('calendarEvents').add(event);
            });

            this.updateStudiedMinutes(newEvents[0].userId, sumOfMinutes);
        }
    }

    updateStudiedMinutes(userId: string, sumOfMinutes: number) {
        const userDocRef = this.db.collection('studiedHours').doc(userId);

        // Use set with merge option to update document if it exists or create a new one if it doesn't
        userDocRef.set({ minutes: sumOfMinutes }, { merge: true })
            .then(() => {
                console.log("Document successfully updated/created!");
            })
            .catch((error) => {
                console.error("Error updating/creating document: ", error);
            });
    }
}