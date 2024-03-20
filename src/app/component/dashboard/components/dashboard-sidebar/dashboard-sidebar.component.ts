import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/component/authentication/auth.service';
import * as DashboardActions from '../../dashboard-store/dashboard.actions';
import { filter, Subject, takeUntil } from 'rxjs';
import { selectMenu } from '../../dashboard-store/dashboard.selectors';
export type MenuOptions = { icon: string, name: string };

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {
  menuOptions: MenuOptions[] = [
    { icon: 'dashboard', name: 'Dashboard' },
    { icon: 'email', name: 'Inbox' },
    { icon: 'date_range', name: 'Calendar' },
    { icon: 'file_copy', name: 'Templates' },
    { icon: 'people', name: 'Friends' },
    { icon: 'adjust', name: 'Goals' },
    { icon: 'settings', name: 'Settings' }
  ];
  destroyed$ = new Subject<boolean>();
  curentMenuName: string = 'Dashboard';
  @Output() onCloseSidebar = new EventEmitter<void>();

  constructor(private auth: AuthService, private store: Store) { }

  ngOnInit(): void {
    this.store
      .select(selectMenu)
      .pipe(
        filter((v) => v !== null),
        takeUntil(this.destroyed$)
      )
      .subscribe((menuName) => { this.curentMenuName = menuName });
  }

  signOut() {
   this.auth.logout();
  }

  setCurrentMenu(menuName: string): void {
    this.store.dispatch(DashboardActions.setDashboardMenu({ menuName: menuName }));
    this.onCloseSidebar.emit();
  }

  ngOnDestroy(): void {
    // unsubscribing from every subscription preventing memory leaks
    this.destroyed$.next(true);
    this.destroyed$.complete();
    // Setting state to initial state
    this.store.dispatch(DashboardActions.clearDashboardState());
  }
}
