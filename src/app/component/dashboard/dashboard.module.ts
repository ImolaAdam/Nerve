import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardMainCardsComponent } from './components/dashboard-main/dashboard-main-cards/dashboard-main-cards.component';
import { DashboardMainProfileComponent } from './components/dashboard-main/dashboard-main-profile/dashboard-main-profile.component';
import { DashboardMainCalendarComponent } from './components/dashboard-main/dashboard-main-calendar/dashboard-main-calendar.component';
import { DashboardMainFriendsComponent } from './components/dashboard-main/dashboard-main-friends/dashboard-main-friends.component';
import { DashboardMainInboxComponent } from './components/dashboard-main/dashboard-main-inbox/dashboard-main-inbox.component';
import { DashboardMainSettingsComponent } from './components/dashboard-main/dashboard-main-settings/dashboard-main-settings.component';
import { DashboardMainTemplatesComponent } from './components/dashboard-main/dashboard-main-templates/dashboard-main-templates.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardMainComponent,
    DashboardMainCardsComponent,
    DashboardMainProfileComponent,
    DashboardMainCalendarComponent,
    DashboardMainFriendsComponent,
    DashboardMainInboxComponent,
    DashboardMainSettingsComponent,
    DashboardMainTemplatesComponent,
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