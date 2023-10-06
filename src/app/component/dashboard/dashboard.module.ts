import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardMainComponent,
    DashboardSidebarComponent,
    
  ],
  exports: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardMainComponent,
    DashboardSidebarComponent,
  ]
})
export class DashboardModule { }
