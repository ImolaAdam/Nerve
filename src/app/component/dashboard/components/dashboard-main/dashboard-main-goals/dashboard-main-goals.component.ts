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
import { NewGoal } from 'src/app/shared/models/new-goal.model';

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
  ) {
    this.form = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((user) => {
        if (user) {
          this.authUserId = user.userId;
          this.goalService.getGoals(this.authUserId);
        }
      })
    );

    this.subscriptions.push(
      this.store.select(selectDailyGoals).subscribe((goals => {
        if (goals) {
          this.dailyTodoList = goals;
          this.spinnerDailyValue = this.calculateSpinnerValue(this.dailyTodoList);
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectYearlyGoals).subscribe((goals => {
        if (goals) {
          this.yearlyTodoList = goals;
          this.spinnerYearlyValue = this.calculateSpinnerValue(this.yearlyTodoList);
        }
      }))
    );

    this.spinnerMonthlyValue = this.calculateSpinnerValue(this.monthlyTodoList);
    this.spinnerWeeklyValue = this.calculateSpinnerValue(this.weeklyTodoList);
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

  onSaveGoal(goals: FormArray) {
    goals.value.forEach((goal: NewGoal) => {
      if (goal.description && goal.startDate) {
        this.goalService.addNewGoal(goal);
      }
    });
    this.newYearlyGoals.clear();
  }

  onDeleteFormItem(index: number) {
    this.newYearlyGoals.removeAt(index);
  }

  onAddItem() {
    const newGoalFormGroup = this.fb.group({
      userId: [this.authUserId],
      goalType: ['Yearly'],
      startDate: [new Date()],
      endDate: [null],
      description: [''],
      isCompleted: [false]
    });
  
    this.newYearlyGoals.push(newGoalFormGroup);
  }
  
  onDeleteGoal(id: string) {
    this.goalService.onDeleteGoal(id);
  }

  onUpdateGoal(goalId: string, value: boolean) {
    if(goalId) {
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
