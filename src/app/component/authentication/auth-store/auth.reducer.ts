import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions'
import { UserDto } from 'src/app/shared/dto/userDto';

export const AUTH_STATE_NAME = 'auth';

export interface AuthState {
    error: string | null;
    token: string | null;
    user: UserDto | null;
    studiedHurs: number
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    error: null,
    studiedHurs: 0
};

export const authReducer = createReducer(
    initialAuthState,
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
    }),
    on(AuthActions.setStudiedHours, (state, { studiedHours }) => {
        return {
            ...state,
            studiedHours
        }
    })
);