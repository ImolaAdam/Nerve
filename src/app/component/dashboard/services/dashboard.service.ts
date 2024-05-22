import { Injectable, OnDestroy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Subscription, map } from "rxjs";
import * as DashboardActions from '../dashboard-store/dashboard.actions';

@Injectable()
export class DashboardService implements OnDestroy {
    private subscriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private store: Store
    ) { }

    async getNumberOfStuiedHours(userId: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let numberOfHoursStudied: number = 0;
    
            this.subscriptions.push(this.db.collection('studiedMinutes')
                .snapshotChanges()
                .pipe(map(docData => {
                    return docData.map(doc => {
                        const data = doc.payload.doc.data() as any;
                        const id = doc.payload.doc.id;
                        data.id = id;
    
                        return {
                            ...data
                        };
                    }).filter((event) => event.userId == userId);
                }))
                .subscribe({
                    next: (statistic: any) => {
                        numberOfHoursStudied = Math.floor(statistic[0].minutes / 60);
                        resolve(numberOfHoursStudied); // Resolve the promise with the correct value
                    },
                    error: (error) => {
                        this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                        reject(error); // Reject the promise if there's an error
                    }
                })
            );
        });
    }
    

    ngOnDestroy(): void {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach((s) => {
                s.unsubscribe();
            })
        }
    }
}