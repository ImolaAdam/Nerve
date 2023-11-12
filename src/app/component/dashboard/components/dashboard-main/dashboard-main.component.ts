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
