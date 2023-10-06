import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.auth.signOut();
  }
}
