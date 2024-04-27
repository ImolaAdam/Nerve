import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
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
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private store: Store
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe( (user) => {
        if(user) {
          this.userName = user.userName;
        }
      })
    );
  }

  onSidenavToggle() {
    this.onCloseSidebar.emit();
  }

  ngOnDestroy() {
    if(this.subscriptions) {
      this.subscriptions.forEach(s => {
        s.unsubscribe();
      })
    }
  }

}
