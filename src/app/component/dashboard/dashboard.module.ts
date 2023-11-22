import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardMainCardsComponent } from './components/dashboard-main/dashboard-main-cards/dashboard-main-cards.component';
import { DashboardMainCalendarComponent } from './components/dashboard-main/dashboard-main-calendar/dashboard-main-calendar.component';
import { DashboardMainFriendsComponent } from './components/dashboard-main/dashboard-main-friends/dashboard-main-friends.component';
import { DashboardMainInboxComponent } from './components/dashboard-main/dashboard-main-inbox/dashboard-main-inbox.component';
import { DashboardMainSettingsComponent } from './components/dashboard-main/dashboard-main-settings/dashboard-main-settings.component';
import { DashboardMainTemplatesComponent } from './components/dashboard-main/dashboard-main-templates/dashboard-main-templates.component';
import { InboxLetterListComponent } from './components/dashboard-main/dashboard-main-inbox/inbox-letter-list/inbox-letter-list.component';
import { DashboardMainGoalsComponent } from './components/dashboard-main/dashboard-main-goals/dashboard-main-goals.component';
import { FriendsAddNewFriendComponent } from './components/dashboard-main/dashboard-main-friends/friends-add-new-friend/friends-add-new-friend.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardMainComponent,
    DashboardMainCardsComponent,
    DashboardMainGoalsComponent,
    DashboardMainCalendarComponent,
    DashboardMainFriendsComponent,
    FriendsAddNewFriendComponent,
    DashboardMainInboxComponent,
    InboxLetterListComponent,
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
