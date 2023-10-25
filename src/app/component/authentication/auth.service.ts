import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth-store/auth.actions'
import { UserAuthDto } from './model/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router, private store: Store,) { }

  async login(email: string, password: string): Promise<UserAuthDto> {
    try {
      const result = await this.fireAuth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('token', 'true');

      if (result.user?.emailVerified) {
        this.router.navigate(['dashboard']);

        const user: UserAuthDto = {
          email: result.user?.email,
          authUserId: result.user.tenantId,
          birtday: new Date(2000, 4, 20),
          role: 'Beginner',
          userName: result.user.displayName,
          familyName: 'Plan',
          givenName: 'B'
        };

        return user;
      } else {
        this.router.navigate(['verify-email']);
        throw new Error('Email not verified');
      }
    } catch (error) {
      this.store.dispatch(AuthActions.firebaseLoginError({ errorMessage: error as string }));
      alert('Something went wrong');
      this.router.navigate(['/login']);
      throw error;
    }
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(result => {
      this.router.navigate(['/login']);
      this.sendEmailForUserVerification();
    }, error => {
      alert('Something went wrong');
      this.router.navigate(['/register']);
    })
  }

  sendEmailForUserVerification() {
    this.fireAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email']);
      }, (error: any) => {
        alert('Something went wrong. Not able to send email to registered Email.');
      })
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    }, error => {
      alert(error.message);
      this.router.navigate(['/login']);
    })
  }

  //with then we are catching the result
  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, error => {
      alert('Something went wrong');
    })
  }
}
