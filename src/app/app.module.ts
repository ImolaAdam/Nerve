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
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    DashboardModule,
    StoreModule.forRoot({ 
      [DASHBOARD_STATE_NAME]: dashboardReducer 
    }),
    EffectsModule.forRoot([DashboardEffects]),
    //// Retains last 25 states
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
