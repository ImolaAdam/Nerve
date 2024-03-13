import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions'
import { catchError, from, map, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        //private toastr: ToastrService
    ) { }
/*
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
  );*/

}