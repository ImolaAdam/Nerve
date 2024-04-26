import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions'

export const APP_STATE_NAME = 'app';

export interface State {
    isLoading: boolean;
    errorMessage: string | null;
}

export const initialAppState: State = {
    isLoading: false,
    errorMessage: null
};

export const appReducer = createReducer(
    initialAppState,
    on(AppActions.loading, (state) => {
        return {
            ...state,
            isLoading: true,
            errorMessage: null
        }
    }),
    on(AppActions.loaded, (state) => {
        return {
            ...state,
            isLoading: false,
            errorMessage: null
        }
    }),
    on(AppActions.catchError, (state, { error }) => {
        return {
            ...state,
            errorMessage: error
        }
    })
);