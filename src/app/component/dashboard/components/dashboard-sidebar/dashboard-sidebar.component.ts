import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/component/authentication/auth.service';
import * as DashboardActions from '../../dashboard-store/dashboard.actions';

export type MenuOptions = {icon: string, name: string};
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {
  menuOptions: MenuOptions[] = [
    {icon: 'fa-solid fa-envelope', name: 'Inbox'},
    {icon: 'fa-solid fa-calendar', name: 'Calendar'},
    {icon: 'fa-solid fa-user-group', name: 'Friends'},
    {icon: 'fa-solid fa-file', name: 'Templates'},
    {icon: 'fa-solid fa-user', name: 'Profile'},
    {icon: 'fa-solid fa-gear', name: 'Settings'}
  ];
  constructor(private auth: AuthService, private store: Store) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut();
  }

  setCurrentMenu(menuName: string): void {
    this.store.dispatch(DashboardActions.setDashboardMenu({ menuName: menuName }));
    console.log(menuName);
  }

}
