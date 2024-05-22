import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_STATE_NAME, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);
export const selectAuthUser = createSelector(selectAuthState, (state) => state.user);
export const selectErrorMessage = createSelector(selectAuthState, (state) => state?.error);
export const selectStudiedHours = createSelector(selectAuthState, (state) => state.studiedHurs);