import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TodoList } from 'src/app/shared/components/todo-list/todo-list.component';

@Component({
  selector: 'app-dashboard-main-goals',
  templateUrl: './dashboard-main-goals.component.html',
  styleUrls: ['./dashboard-main-goals.component.scss']
})
export class DashboardMainGoalsComponent implements OnInit {
  dailyTodoList: TodoList[] = [
    { name: 'Do homework', isCompleted: true, disappear: true },
    { name: 'Buy present', isCompleted: true, disappear: true },
    { name: 'Relax, u dont have to kill yourself', isCompleted: true, disappear: true },
    { name: 'Mephi food', isCompleted: true, disappear: true },
    { name: 'Another one', isCompleted: true, disappear: true },
    { name: 'Again', isCompleted: true, disappear: true },
    { name: 'Do homework', isCompleted: true, disappear: true },
    { name: 'Do homework', isCompleted: true, disappear: true },
  ];

  weeklyTodoList: TodoList[] = [
    { name: 'Do homework', isCompleted: false, disappear: false },
    { name: 'Buy present', isCompleted: false, disappear: false },
    { name: 'Relax, u dont have to kill yourself', isCompleted: true, disappear: false },
    { name: 'Mephi food', isCompleted: false, disappear: false },
    { name: 'Another one', isCompleted: false, disappear: false },
  ];

  monthlyTodoList: TodoList[] = [
    { name: 'Visit Makó', isCompleted: false, disappear: false },
    { name: 'Paint room', isCompleted: false, disappear: false },
    { name: 'Relax, u dont have to kill yourself', isCompleted: true, disappear: false },
    { name: 'Order Mephi food <3', isCompleted: false, disappear: false },
  ];

  yearlyTodoList: TodoList[] = [
    { name: 'Loose 10kg', isCompleted: false, disappear: false },
    { name: 'Buy a guitar', isCompleted: true, disappear: false },
    { name: 'Go to the Netherlands', isCompleted: false, disappear: false },
  ];

  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'determinate';
  spinnerYearlyValue: number = 0;
  spinnerMonthlyValue: number = 0;
  spinnerWeeklyValue: number = 0;
  spinnerDailyValue: number = 0;

  yearlyEditingMode: boolean = false;
  monthlyEditingMode: boolean = false;
  weeklyEditingMode: boolean = false;
  dailyEditingMode: boolean = false;

  constructor() { }

  ngOnInit() {
    this.spinnerYearlyValue = this.calculateSpinnerValue(this.yearlyTodoList);
    this.spinnerMonthlyValue = this.calculateSpinnerValue(this.monthlyTodoList);
    this.spinnerWeeklyValue = this.calculateSpinnerValue(this.weeklyTodoList);
    this.spinnerDailyValue = this.calculateSpinnerValue(this.dailyTodoList);
  }

  private calculateSpinnerValue(list: TodoList[]): number {
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

  onDeleteGoal(title: string, goal: TodoList) {
    console.log('delete')
  }

}
