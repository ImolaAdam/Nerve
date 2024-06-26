import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './component/authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { RegistrationComponent } from './component/authentication/registration/registration.component';
import { VerifyEmailComponent } from './component/authentication/verify-email/verify-email.component';
import { DashboardComponent } from './component/dashboard/components/dashboard.component';
import { AuthGuard } from './component/authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
