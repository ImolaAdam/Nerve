import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth-store/auth.actions'
import { User } from 'src/app/shared/models/user.model';
import { AuthData } from 'src/app/shared/models/auth-data.model';
import { Subject } from 'rxjs';
import { UserRank } from 'src/app/shared/enums/user-rank.enum';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private store: Store,
  ) { }

  registerUser(user: User) {
    this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        this.authSuccess();
      })
      .catch(error => {
        console.log(error);
      }
    );
  }

  login(authData: AuthData) {
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.authSuccess();
        console.log('suc')
      })
      .catch(error => {
        console.log(error);
      }
      );
  }

  logout() {
    this.isAuthenticated = false;
    this.authChange.next(false); //notify others, logged in
    this.router.navigate(['/login']);
  }

  getUser() {
    // this would have a reference and could change from the outside
    //return this.user;
    //return { ...this.user }; // returning new object
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  private authSuccess() {
    this.isAuthenticated = true;
    this.authChange.next(true); //notify others, logged in
    this.router.navigate(['/dashboard']);
  }
  /*
    async login(email: string, password: string): Promise<User> {
      try {
        const result = await this.fireAuth.signInWithEmailAndPassword(email, password);
        localStorage.setItem('token', 'true');
  
        if (result.user?.emailVerified) {
          this.router.navigate(['dashboard']);
  
          const user: User = {
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
    }*/
}
