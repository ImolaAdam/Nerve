import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dashboard-main-settings',
  templateUrl: './dashboard-main-settings.component.html',
  styleUrls: ['./dashboard-main-settings.component.scss'],
})
export class DashboardMainSettingsComponent implements OnInit {
  onpasswordUpdate(_t41: NgForm) {
    throw new Error('Method not implemented.');
  }
  model!: NgbDateStruct;

  onProfileUpdate(_t7: NgForm) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {
  }

}
