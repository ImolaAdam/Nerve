import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions'

export const DASHBOARD_STATE_NAME = 'dashboard';

export interface DashboardState {
    error: string | null;
    currentMenu: string | null;
  }
  
  export const initialDashboardState: DashboardState = {
    error: null,
    currentMenu: null,
  };

  export const dashboardReducer = createReducer(
    initialDashboardState,
    on(DashboardActions.setDashboardMenu, (state, { menuName }) => {
      console.log(state, 'red')
      return {
        ...state,
        currentMenu: menuName
      };
    }),
  );