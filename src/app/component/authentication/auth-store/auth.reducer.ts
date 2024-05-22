import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions'
import { UserDto } from 'src/app/shared/dto/userDto';

export const AUTH_STATE_NAME = 'auth';

export interface AuthState {
    error: string | null;
    token: string | null;
    user: UserDto | null;
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    error: null,
};

export const authReducer = createReducer(
    initialAuthState,
    /*on(AuthActions.loggedInWithFirebase,
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
    }),*/

    on(AuthActions.login, (state, { user }) => {
        return {
            ...state,
            user
        }
    }),
    on(AuthActions.logout, (state) => {
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.setErrorMessage, (state, { error }) => {
        return {
            ...state,
            error
        }
    })
);