import { state } from '@angular/animations';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DASHBOARD_STATE_NAME, DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);
export const selectMenu = createSelector(selectDashboardState, (state) => state.currentMenu);
export const selectLetterPage = createSelector(selectDashboardState, (state) => state.letters.pageName);
export const selectInboxLetterList = createSelector(selectDashboardState, state => state.letters.inbox);
export const selectSentLetterList = createSelector(selectDashboardState, state => state.letters.sent);

// Goals
export const selectDailyGoals = createSelector(selectDashboardState, state => state.goals.dailyGoals);
export const selectWeeklyGoals = createSelector(selectDashboardState, state => state.goals.weeklyGoals);
export const selectMonthlyGoals = createSelector(selectDashboardState, state => state.goals.monthlyGoals);
export const selectYearlyGoals = createSelector(selectDashboardState, state => state.goals.yearlyGoals);