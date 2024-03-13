import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/component/authentication/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  @Output() onCloseSidebar = new EventEmitter<void>();
  userName = '';
  isAuth = false;
  authSubs: Subscription | null = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSubs = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
      this.userName = 'molly';
    });
  }

  onSidenavToggle() {
    this.onCloseSidebar.emit();
  }

  ngOnDestroy() {
    this.authSubs?.unsubscribe();
  }

}
