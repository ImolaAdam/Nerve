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
    { name: 'Do homework', isActive: true},
    { name: 'Buy present', isActive: true},
    { name: 'Relax, u dont have to kill yourself', isActive: true},
    { name: 'Mephi food', isActive: true},
    { name: 'Another one', isActive: true},
    { name: 'Again', isActive: true},
    { name: 'Do homework', isActive: true},
    { name: 'Do homework', isActive: true},
  ];

  weeklyTodoList: TodoList[] = [
    { name: 'Do homework', isActive: true},
    { name: 'Buy present', isActive: true},
    { name: 'Relax, u dont have to kill yourself', isActive: true},
    { name: 'Mephi food', isActive: true},
    { name: 'Another one', isActive: true},
  ];

  monthlyTodoList: TodoList[] = [
    { name: 'Visit Makó', isActive: true},
    { name: 'Paint room', isActive: true},
    { name: 'Relax, u dont have to kill yourself', isActive: true},
    { name: 'Order Mephi food <3', isActive: true},
  ];

  yearlyTodoList: TodoList[] = [
    { name: 'Loose 10kg', isActive: true},
    { name: 'Buy a guitar', isActive: true},
    { name: 'Go to the Netherlands', isActive: true},
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
