import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { GoalService } from '../../../services/goal.service';
import { selectDailyGoals, selectYearlyGoals } from '../../../dashboard-store/dashboard.selectors';
import { Goal } from 'src/app/shared/models/goal.model';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard-main-goals',
  templateUrl: './dashboard-main-goals.component.html',
  styleUrls: ['./dashboard-main-goals.component.scss'],
})
export class DashboardMainGoalsComponent implements OnInit, OnDestroy {
  dailyTodoList: Goal[] = [];
  weeklyTodoList: Goal[] = [];
  monthlyTodoList: Goal[] = [];
  yearlyTodoList: Goal[] = [];

  form = this.fb.group({
    items: this.fb.array([])
  });

  subscriptions: Subscription[] = [];
  private authUserId: string = '';
  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'determinate';

  editedDescription: string = '';

  spinnerYearlyValue: number = 0;
  spinnerMonthlyValue: number = 0;
  spinnerWeeklyValue: number = 0;
  spinnerDailyValue: number = 0;

  yearlyEditingMode: boolean = false;
  monthlyEditingMode: boolean = false;
  weeklyEditingMode: boolean = false;
  dailyEditingMode: boolean = false;

  constructor(
    private store: Store,
    private goalService: GoalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((user) => {
        if(user) {
          this.authUserId = user.userId;
          console.log(this.authUserId)
          this.goalService.getGoals(this.authUserId);
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectDailyGoals).subscribe((goals => {
        if(goals) {
          this.dailyTodoList = goals;
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectYearlyGoals).subscribe((goals => {
        if(goals) {
          this.yearlyTodoList = goals.map(goal => ({ ...goal }));
        }
      }))
    );

    this.spinnerYearlyValue = this.calculateSpinnerValue(this.yearlyTodoList);
    this.spinnerMonthlyValue = this.calculateSpinnerValue(this.monthlyTodoList);
    this.spinnerWeeklyValue = this.calculateSpinnerValue(this.weeklyTodoList);
    this.spinnerDailyValue = this.calculateSpinnerValue(this.dailyTodoList);
  }

  get newYearlyGoals() {
    return this.form.get('items') as FormArray;
  }

  private calculateSpinnerValue(list: Goal[]): number {
    const completedTasks: number = list.filter(l => l.isCompleted === true).length;
    const percent: number = (completedTasks / (list.length)) * 100;

    return percent;
  }

  onEditListItem(title: string) {
    switch (title) {
      case 'yearly':
        this.yearlyEditingMode = !this.yearlyEditingMode;
        break;
      case 'monthly':
        this.monthlyEditingMode = !this.monthlyEditingMode;
        break;
      case 'weekly':
        this.weeklyEditingMode = !this.weeklyEditingMode;
        break;
      case 'daily':
        this.dailyEditingMode = !this.dailyEditingMode;
        break;
    }
  }

  onSaveGoal(goal: Goal[]) {
    console.log(goal)
  }

  onDeleteFormItem(index: number) {
    this.newYearlyGoals.removeAt(index);
  }

  onAddItem() {
    this.newYearlyGoals.push(
      this.fb.group({
        userId: this.authUserId,
        goalType: 'Yearly',
        startDate: Date,
        endDate: null,
        description: '',
        isCompleted: false
      })
    )
  }

  onDeleteGoal(title: string, goal: Goal) {
    console.log('delete')
  }

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }

}
