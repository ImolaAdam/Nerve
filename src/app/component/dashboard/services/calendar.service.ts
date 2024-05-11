import { Injectable, OnDestroy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Subscription, first, from, map } from "rxjs";
import { CalendarEventDto } from "src/app/shared/dto/CalendarEventDto";
import { CreateCalendarEventDto } from "src/app/shared/dto/CreateCalendarEventDto";
import { Colors } from "../components/dashboard-main/dashboard-main-calendar/dashboard-main-calendar.component";
import * as DashboardActions from '../dashboard-store/dashboard.actions';

interface StudiedMinutes {
    minutes: number;
    userId: string;
}

@Injectable()
export class CalendarService implements OnDestroy {
    private subscriptions: Subscription[] = [];

    colors: Colors = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3',
        },
        blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF',
        },
        yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA',
        },
    };

    constructor(
        private db: AngularFirestore,
        private store: Store
    ) { }

    createNewEvents(newEvents: CreateCalendarEventDto[], sumOfMinutes: number) {
        if (newEvents.length != 0) {
            newEvents.forEach((event) => {
                this.db.collection('calendarEvents').add(event);
            });

            this.updateStudiedMinutes(newEvents[0].userId, sumOfMinutes, false);
        }
    }

    updateStudiedMinutes(userId: string, sumOfMinutes: number, isDeleted: boolean) {
        // Get a reference to the collection
        const collectionRef = this.db.collection('studiedMinutes');

        // Query for documents where userId matches the provided userId and limit to 1
        const query = collectionRef.ref.where('userId', '==', userId).limit(1);

        // Execute the query
        query.get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    // If a matching document is found, update it
                    querySnapshot.forEach(doc => {
                        // Get the data from the document and explicitly cast it to the defined interface
                        const data = doc.data() as StudiedMinutes | undefined;

                        // Check if data exists and if minutes property is defined
                        const currentMinutes = data?.minutes || 0; // Default to 0 if minutes doesn't exist

                        // Calculate the new total minutes
                        let newMinutes = 0;
                        if (isDeleted) {
                            newMinutes = currentMinutes - sumOfMinutes;
                        } else {
                            newMinutes = currentMinutes + sumOfMinutes;
                        }


                        doc.ref.set({ minutes: newMinutes, userId: userId }, { merge: true })
                            .then(() => {
                                console.log("Document successfully updated!");
                            })
                            .catch(error => {
                                console.error("Error updating document: ", error);
                            });
                    });
                } else {
                    // If no matching document is found, create a new one
                    collectionRef.add({ minutes: sumOfMinutes, userId })
                        .then(() => {
                            console.log("New document created!");
                        })
                        .catch(error => {
                            console.error("Error creating document: ", error);
                        });
                }
            })
            .catch(error => {
                console.error("Error querying documents: ", error);
            });
    }

    getCalendarEvents(userId: string) {
        this.store.dispatch(DashboardActions.getMonthlyEvents());

        this.subscriptions.push(this.db.collection('calendarEvents')
            .snapshotChanges()
            .pipe(map(docData => {
                return docData.map(doc => {
                    const data = doc.payload.doc.data() as any;
                    const id = doc.payload.doc.id;
                    data.id = id;
                    data.startDate = data.startDate.toDate();
                    data.endDate = data.endDate?.toDate();

                    return {
                        ...data
                    };
                }).filter((event) => event.userId == userId);
            }))
            .subscribe({
                next: (events) => {
                    let formattedEvents: CalendarEventDto[] = [];
                    if (events.length > 0) {
                        events.forEach((e) => {
                            let formattedEvent: CalendarEventDto = {
                                documentId: e.id,
                                start: e.startDate,
                                end: e.endDate,
                                title: e.name,
                                color: this.colors.blue,
                                resizable: {
                                    afterEnd: true,
                                    beforeStart: true
                                },
                                draggable: true
                            };
                            formattedEvents.push(formattedEvent);
                        })
                    }

                    if (formattedEvents.length > 0) {
                        this.store.dispatch(DashboardActions.monthlyEventsset({ monthlyEvents: formattedEvents }));
                    }
                },
                error: (error) => {
                    this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                }
            })
        );
    }

    deleteCalendarEvent(id: string, userId: string, lostMinutes: number) {
        // Get the reference to the document
        const docRef = this.db.collection('calendarEvents').doc(id).ref;

        // Delete the document
        docRef.delete()
            .then(() => {
                this.updateStudiedMinutes(userId, lostMinutes, true);
            })
            .catch(error => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
            });
    }


    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((s) => {
                s.unsubscribe();
            })
        }
    }
}