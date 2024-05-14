import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TodoList } from 'src/app/shared/components/todo-list/todo-list.component';
import { Goal } from 'src/app/shared/models/goal.model';
import { GoalService } from '../../../services/goal.service';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { selectDailyGoals, selectMonthlyGoals, selectWeeklyGoals, selectYearlyGoals } from '../../../dashboard-store/dashboard.selectors';
import { UserDto } from 'src/app/shared/dto/userDto';

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

  constructor(
    private store: Store,
    private goalService: GoalService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((user) => {
        if (user?.userId && user.role) {
          this.authUserId = user.userId;
          this.goalService.getGoals(this.authUserId);
          this.authUser = user;
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectDailyGoals).subscribe((goals => {
        if (goals) {
          this.dailyTodoList = goals;
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectYearlyGoals).subscribe((goals => {
        if (goals) {
          this.yearlyTodoList = goals;
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectWeeklyGoals).subscribe((goals => {
        if (goals) {
          this.weeklyTodoList = goals;
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectMonthlyGoals).subscribe((goals => {
        if (goals) {
          this.monthlyTodoList = goals;
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
