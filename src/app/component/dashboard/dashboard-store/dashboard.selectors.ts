import { state } from '@angular/animations';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DASHBOARD_STATE_NAME, DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);
export const selectMenu = createSelector(selectDashboardState, (state) => state.currentMenu);
export const selectLetterPage = createSelector(selectDashboardState, (state) => state.letters.pageName);
export const selectInboxLetterList = createSelector(selectDashboardState, state => state.letters.inbox);
export const selectSentLetterList = createSelector(selectDashboardState, state => state.letters.sent);