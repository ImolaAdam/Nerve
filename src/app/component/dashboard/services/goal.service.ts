import { Injectable, OnDestroy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Subscription, map } from "rxjs";
import { Goal } from "src/app/shared/models/goal.model";
import * as DashboardActions from "../dashboard-store/dashboard.actions";
import { NewGoal } from "src/app/shared/models/new-goal.model";
import { SnackBarService } from "src/app/shared/services/snackBar.service";

@Injectable()
export class GoalService implements OnDestroy {
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private store: Store,
        private snackbarService: SnackBarService
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

    addNewGoal(newGoal: NewGoal) {
        if (newGoal.userId) {
            this.db.collection('goals').add(newGoal);
        }
    }

    onDeleteGoal(goalId: string) {
        // Get the reference to the document
        const docRef = this.db.collection('goals').doc(goalId);

        // Delete the document
        docRef.delete()
            .then(() => {
                this.snackbarService.openSnackBar('Goal deleted');
            })
            .catch((error) => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            }
            );
    }

    onUpdateGoal(goalId: string, value: boolean) {
        const docRef = this.db.collection('goals').doc(goalId);

        docRef.update({ isCompleted: value })
            .then(() => {
                this.snackbarService.openSnackBar('Goal updated');
            })
            .catch((error) => {
                this.store.dispatch(DashboardActions.setErrorMessage({ error }));
                this.snackbarService.openSnackBar('Something went wrong');
            }
            );
    }

    ngOnDestroy(): void {
        if (this.fbSubs) {
            this.fbSubs.forEach((s) => {
                s.unsubscribe();
            })
        }
    }

}