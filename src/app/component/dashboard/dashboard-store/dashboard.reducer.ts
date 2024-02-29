import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions'

export const DASHBOARD_STATE_NAME = 'dashboard';

export interface DashboardState {
    error: string;
    currentMenu: string;
  }
  
  export const initialDashboardState: DashboardState = {
    error: '',
    currentMenu: 'Calendar',
    //currentMenu: 'Friends',
  };

  export const dashboardReducer = createReducer(
    initialDashboardState,
    on(DashboardActions.setDashboardMenu, (state, { menuName }) => {
      return {
        ...state,
        currentMenu: menuName
      };
    }),
    on(DashboardActions.clearDashboardState, () => initialDashboardState),
  );