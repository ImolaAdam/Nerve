import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './component/authentication/auth.module';
import { DashboardModule } from './component/dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { DASHBOARD_STATE_NAME, dashboardReducer } from './component/dashboard/dashboard-store/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './component/dashboard/dashboard-store/dashboard.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AUTH_STATE_NAME, authReducer } from './component/authentication/auth-store/auth.reducer';
import { AuthEffects } from './component/authentication/auth-store/auth.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AuthService } from './component/authentication/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    SharedModule,
    DashboardModule,
    StoreModule.forRoot({ 
      [AUTH_STATE_NAME]: authReducer,
      [DASHBOARD_STATE_NAME]: dashboardReducer,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      DashboardEffects
    ]),
    // Retains last 25 states
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    NgbModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
