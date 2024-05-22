import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser, selectStudiedHours } from 'src/app/component/authentication/auth-store/auth.selectors';
import { GoalService } from '../../../services/goal.service';
import { selectDailyGoals, selectMonthlyGoals, selectWeeklyGoals, selectYearlyGoals } from '../../../dashboard-store/dashboard.selectors';
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

  limits = {
    dailyLimit: 0,
    weeklyLimit: 0,
    monthlyLimit: 0,
    yearlyLimit: 0
  }

  yearlyForm = this.fb.group({
    items: this.fb.array([])
  });

  monthlyForm = this.fb.group({
    items: this.fb.array([])
  });

  weeklyForm = this.fb.group({
    items: this.fb.array([])
  });

  dailyForm = this.fb.group({
    items: this.fb.array([])
  });

  subscriptions: Subscription[] = [];
  private authUserId: string = '';
  authUserRole = '';

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
    this.yearlyForm = this.fb.group({
      items: this.fb.array([])
    });

    this.monthlyForm = this.fb.group({
      items: this.fb.array([])
    });

    this.weeklyForm = this.fb.group({
      items: this.fb.array([])
    });

    this.dailyForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((user) => {
        if (user?.userId) {
          this.authUserId = user.userId;
          this.goalService.getGoals(this.authUserId);
          this.authUserRole = user.role;
          this.calculateGoalLimits(user.role);
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

    this.subscriptions.push(
      this.store.select(selectWeeklyGoals).subscribe((goals => {
        if (goals) {
          this.weeklyTodoList = goals;
          this.spinnerWeeklyValue = this.calculateSpinnerValue(this.weeklyTodoList);
        }
      }))
    );

    this.subscriptions.push(
      this.store.select(selectMonthlyGoals).subscribe((goals => {
        if (goals) {
          this.monthlyTodoList = goals;
          this.spinnerMonthlyValue = this.calculateSpinnerValue(this.monthlyTodoList);
        }
      }))
    );
  }

  get newYearlyGoals() {
    return this.yearlyForm.get('items') as FormArray;
  }
  get newMonthlyGoals() {
    return this.monthlyForm.get('items') as FormArray;
  }
  get newWeeklyGoals() {
    return this.weeklyForm.get('items') as FormArray;
  }
  get newDailyGoals() {
    return this.dailyForm.get('items') as FormArray;
  }

  private calculateSpinnerValue(list: Goal[]): number {
    const completedTasks: number = list.filter(l => l.isCompleted === true).length;
    const percent: number = (completedTasks / (list.length)) * 100;

    return percent;
  }

  calculateGoalLimits(rank: string) {
    switch (rank) {
      case 'Beginner':
        this.limits = {
          dailyLimit: 7,
          weeklyLimit: 2,
          monthlyLimit: 4,
          yearlyLimit: 3
        };
        break;
      case 'Medium':
        this.limits = {
          dailyLimit: 8,
          weeklyLimit: 3,
          monthlyLimit: 5,
          yearlyLimit: 4
        };
        break;
      case 'Expert':
        this.limits = {
          dailyLimit: 10,
          weeklyLimit: 4,
          monthlyLimit: 6,
          yearlyLimit: 5
        };
        break;
      default:
    }
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

  onSaveGoal(goals: FormArray, goalType: string) {
    goals.value.forEach((goal: NewGoal) => {
      if (goal.description && goal.startDate) {
        this.goalService.addNewGoal(goal);
      }
    });

    switch (goalType) {
      case 'Yearly':
        this.newYearlyGoals.clear();
        break;
      case 'Monthly':
        this.newMonthlyGoals.clear();
        break;
      case 'Weekly':
        this.newWeeklyGoals.clear();
        break;
      case 'Daily':
        this.newDailyGoals.clear();
        break;
    }
  }

  onDeleteFormItem(formyType: string, index: number) {
    switch (formyType) {
      case 'Yearly':
        this.newYearlyGoals.removeAt(index);
        break;
      case 'Monthly':
        this.newMonthlyGoals.removeAt(index);
        break;
      case 'Weekly':
        this.newWeeklyGoals.removeAt(index);
        break;
      case 'Daily':
        this.newDailyGoals.removeAt(index);
        break;
    }
  }

  onAddItem(goalType: string) {
    const newGoalFormGroup = this.fb.group({
      userId: [this.authUserId],
      goalType: [goalType],
      startDate: [new Date()],
      endDate: [null],
      description: [''],
      isCompleted: [false]
    });

    switch (goalType) {
      case 'Yearly':
        this.newYearlyGoals.push(newGoalFormGroup);
        break;
      case 'Monthly':
        this.newMonthlyGoals.push(newGoalFormGroup);
        break;
      case 'Weekly':
        this.newWeeklyGoals.push(newGoalFormGroup);
        break;
      case 'Daily':
        this.newDailyGoals.push(newGoalFormGroup);
        break;
    }
  }

  onDeleteGoal(id: string) {
    this.goalService.onDeleteGoal(id);
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
