import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth-store/auth.actions'
import { User } from 'src/app/shared/models/user.model';
import { AuthData } from 'src/app/shared/models/auth-data.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDto } from 'src/app/shared/dto/userDto';
import { EmailService } from '../dashboard/services/email.service';

@Injectable()
export class AuthService implements OnDestroy {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();
  userSubscription!: Subscription;
  authSubscription!: Subscription;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private store: Store,
    private db: AngularFirestore,
    private emailService: EmailService
  ) { }

  initAuthListener() {
    this.authSubscription = this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        // Todo: store user
        this.authChange.next(true); //notify others, logged in
        this.router.navigate(['/dashboard']);
      } else {
        this.emailService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(user: User) {
    this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        this.db.collection('users').add(user);
      })
      .catch(error => {
        console.log(error);
      }
      );
  }

  login(authData: AuthData) {
    let user: User | null = null;
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.getUser(authData.email);
      })
      .catch(error => {
        console.log(error);
      }
      );
    return user;
  }

  logout() {
    this.fireAuth.signOut();
  }

  getUser(email: string) {
    // Email is unique, 1:1
    const userCollection = this.db.collection('users', ref => ref.where('email', '==', email));

    // Query for the user document with the specified email
    // Subscribe to the observable returned by get()
    this.userSubscription = userCollection.get().subscribe(
      {
        next: (querySnapshot) => {
          if (!querySnapshot.empty) {
            // If there is a matching document, access it
            querySnapshot.forEach((doc) => {
              // Access the data of the document
              let user: UserDto = {
                userId: doc.id,
                birthday: (doc.data() as any).birthday,
                email: (doc.data() as any).email,
                role: (doc.data() as any).role,
                userName: (doc.data() as any).userName
              }
              user.userId = doc.id;

              this.store.dispatch(AuthActions.login({ user }));
            });
          }
        },
        error: (e) => console.error('Error getting user:', e)
      })
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }
}