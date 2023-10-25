import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-main-profile',
  templateUrl: './dashboard-main-profile.component.html',
  styleUrls: ['./dashboard-main-profile.component.scss']
})
export class DashboardMainProfileComponent implements OnInit {

  userName: string = '';
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {}

}
