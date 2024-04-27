import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Subscription, map } from "rxjs";
import { Goal } from "src/app/shared/models/goal.model";
import * as DashboardActions from "../dashboard-store/dashboard.actions";

@Injectable()
export class GoalService {
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private store: Store
    ) { }

    getGoals(userId: string) {
        this.fbSubs.push(this.db.collection('goals')
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
                }).filter((goal) => goal.userId == userId);
            }))
            .subscribe({
                next: (goals) => {
                    const dailyGoals = goals.filter(g => g.goalType == 'Daily');
                    const weeklyGoals = goals.filter(g => g.goalType == 'Weekly');
                    const monthlyGoals = goals.filter(g => g.goalType == 'Monthly');
                    const yearlyGoals = goals.filter(g => g.goalType == 'Yearly');
                    this.storeGoals(dailyGoals, weeklyGoals, monthlyGoals, yearlyGoals);

                },
                error: (e) => {

                }
            })
        );
    }

    private storeGoals(dailyGoals: Goal[], weeklyGoals: Goal[], monthlyGoals: Goal[], yearlyGoals: Goal[]) {
        this.store.dispatch(DashboardActions.setDailyGoals({ dailyGoals }));
        this.store.dispatch(DashboardActions.setWeeklyGoals({ weeklyGoals }));
        this.store.dispatch(DashboardActions.setMonthlyGoals({ monthlyGoals }));
        this.store.dispatch(DashboardActions.setYearlyGoals({ yearlyGoals }));
    }

}