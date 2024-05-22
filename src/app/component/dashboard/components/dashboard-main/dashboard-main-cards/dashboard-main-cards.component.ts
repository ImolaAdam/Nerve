import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Goal } from 'src/app/shared/models/goal.model';
import { GoalService } from '../../../services/goal.service';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { selectDailyGoals, selectMonthlyGoals, selectWeeklyGoals, selectYearlyGoals } from '../../../dashboard-store/dashboard.selectors';
import { UserDto } from 'src/app/shared/dto/userDto';
import { DashboardService } from '../../../services/dashboard.service';
import * as DashboardActions from '../../../dashboard-store/dashboard.actions';

@Component({
  selector: 'app-dashboard-main-cards',
  templateUrl: './dashboard-main-cards.component.html',
  styleUrls: ['./dashboard-main-cards.component.scss']
})
export class DashboardMainCardsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  private authUserId: string = '';
  authUser: UserDto | undefined;

  dailyTodoList: Goal[] = [];
  weeklyTodoList: Goal[] = [];
  monthlyTodoList: Goal[] = [];
  yearlyTodoList: Goal[] = [];
  studiedHours: number = 0;
  numberOfCoffee: number = 0;
  hoursUntilNextRank = 0;

  numOfCompletedGoals = {
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
  };

  constructor(
    private store: Store,
    private goalService: GoalService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((user) => {
        if (user?.userId && user.role) {
          this.authUserId = user.userId;
          this.goalService.getGoals(this.authUserId);
          this.authUser = user;

          this.dashboardService.getNumberOfStuiedHours(this.authUserId)
            .then((numberOfHours: number) => {
              this.studiedHours = numberOfHours;
              this.numberOfCoffee = Math.floor(this.studiedHours / 4);
              this.hoursUntilNextRank = (100 - this.studiedHours);

              if (user.role == 'Expert') this.hoursUntilNextRank = 0;
            })
            .catch((error) => {
              this.store.dispatch(DashboardActions.setErrorMessage({ error }))
            });

        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectDailyGoals).subscribe((goals => {
        if (goals) {
          this.dailyTodoList = goals;
          this.numOfCompletedGoals.daily = this.dailyTodoList.filter(d => d.isCompleted).length;
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectYearlyGoals).subscribe((goals => {
        if (goals) {
          this.yearlyTodoList = goals;
          this.numOfCompletedGoals.yearly = this.yearlyTodoList.filter(d => d.isCompleted).length;
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectWeeklyGoals).subscribe((goals => {
        if (goals) {
          this.weeklyTodoList = goals;
          this.numOfCompletedGoals.weekly = this.weeklyTodoList.filter(d => d.isCompleted).length;
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectMonthlyGoals).subscribe((goals => {
        if (goals) {
          this.monthlyTodoList = goals;
          this.numOfCompletedGoals.monthly = this.monthlyTodoList.filter(d => d.isCompleted).length;
        }
      }))
    );
  }

  onUpdateGoal(goalId: string, value: boolean) {
    if (goalId) {
      this.goalService.onUpdateGoal(goalId, value);
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }

}
