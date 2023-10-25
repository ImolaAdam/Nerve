import { createReducer, on } from '@ngrx/store';
import { UserAuthDto } from '../model/user-model';
import * as AuthActions from './auth.actions'

export const AUTH_STATE_NAME = 'auth';

export interface AuthState {
    errorMessage: string | null;
    token: string | null;
    user: UserAuthDto | null;
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    errorMessage: null,
};

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.loggedInWithFirebase,
        AuthActions.forgotPassword,
        AuthActions.registerWithFirebaseStart,
        (state) => {
        return {
            ...state,
            errorMessage: null
        };
    }),
    on(AuthActions.loggedInWithFirebase, (state, { user }) => {
        return {
            ...state,
            user: user,
            errorMessage: null
        }
    }),
    on(AuthActions.firebaseLoginError, (state, { errorMessage }) => {
        return {
            ...state,
            errorMessage: errorMessage
        }
    }),
);