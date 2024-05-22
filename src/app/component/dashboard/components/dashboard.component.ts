import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../dashboard-store/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy
 {
  
  constructor(private store: Store,) { }

  
  ngOnDestroy(): void {
    this.store.dispatch(DashboardActions.clearDashboardState());
  }
  
}
