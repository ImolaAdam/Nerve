import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoList } from 'src/app/shared/components/todo-list/todo-list.component';
import { filter, first, Observable, Subject, takeUntil } from 'rxjs';
import { selectMenu } from '../../dashboard-store/dashboard.selectors';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit, OnDestroy {

  dailyTodoList: TodoList[] = [
    { name: 'Do homework', isCompleted: false, disappear: true},
    { name: 'Buy present', isCompleted: false, disappear: true},
    { name: 'Relax, u dont have to kill yourself', isCompleted: false, disappear: true},
    { name: 'Mephi food', isCompleted: false, disappear: true},
    { name: 'Another one', isCompleted: false, disappear: true},
    { name: 'Again', isCompleted: false, disappear: true},
    { name: 'Do homework', isCompleted: false, disappear: true},
    { name: 'Do homework', isCompleted: false, disappear: true},
  ];

  weeklyTodoList: TodoList[] = [
    { name: 'Do homework', isCompleted: false, disappear: false},
    { name: 'Buy present', isCompleted: false, disappear: false},
    { name: 'Relax, u dont have to kill yourself', isCompleted: true, disappear: false},
    { name: 'Mephi food', isCompleted: false, disappear: false},
    { name: 'Another one', isCompleted: false, disappear: false},
  ];

  monthlyTodoList: TodoList[] = [
    { name: 'Visit Makó', isCompleted: false, disappear: false},
    { name: 'Paint room', isCompleted: false, disappear: false},
    { name: 'Relax, u dont have to kill yourself', isCompleted: true, disappear: false},
    { name: 'Order Mephi food <3', isCompleted: false, disappear: false},
  ];

  yearlyTodoList: TodoList[] = [
    { name: 'Loose 10kg', isCompleted: false, disappear: false},
    { name: 'Buy a guitar', isCompleted: false, disappear: false},
    { name: 'Go to the Netherlands', isCompleted: false, disappear: false},
  ];
  destroyed$ = new Subject<boolean>();
  currentMenuName: string = 'Dashboard';
  
  constructor( private store: Store,) { }

  ngOnInit() {
    this.store
    .select(selectMenu)
    .pipe(
      filter((v) => v !== null),
      takeUntil(this.destroyed$)
    )
    .subscribe((menuName) => (this.currentMenuName = menuName));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
