import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions'
import { catchError, from, map, switchMap } from 'rxjs';
import { UserAuthDto } from '../model/user-model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        //private toastr: ToastrService
        private fireAuth: AngularFireAuth,
    ) { }

    firebaseLoginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.firebaseLoginStart),
      switchMap(({ email, password }) => {
        return from(this.authService.login(email, password)).pipe( // Convert Promise to Observable
          map((user) => {
            return AuthActions.loggedInWithFirebase({ user });
          }),
          catchError((error) => {
            // Handle login error and dispatch an error action if needed.
            // You can dispatch a specific action for login errors.
            return [];
          })
        );
      })
    )
  );

}