import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/component/authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //destroyed$ = new Subject<boolean>();
  
  constructor(private auth: AuthService, private store: Store,) { }

  ngOnInit(): void {
    /*
    this.store
    .select(selectMenu)
    .pipe(
      filter((v) => v !== null),
      takeUntil(this.destroyed$)
    )
    .subscribe((menuName) => (this.curentMenuName = menuName));
    */
  }

  signOut() {
    //this.auth.signOut();
  }


  /*
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    //this.store.dispatch(DashboardActions.clearDashboard());
  }
  */
}
