import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions'
import { Letter } from 'src/app/shared/models/letter.model';

export const DASHBOARD_STATE_NAME = 'dashboard';

export interface DashboardState {
  error: string | null;
  currentMenu: string;
  letters: {
    pageName: string,
    inbox: Letter[],
    sent: Letter[]
  };
}

export const initialDashboardState: DashboardState = {
  error: null,
  currentMenu: 'Dashboard',
  letters: {
    pageName: 'Inbox',
    inbox: [],
    sent: []
  }
};

export const dashboardReducer = createReducer(
  initialDashboardState,
  on(DashboardActions.setDashboardMenu, (state, { menuName }) => {
    return {
      ...state,
      currentMenu: menuName
    };
  }),
  on(DashboardActions.setLetterPage, (state, { pageName }) => {
    return {
      ...state,
      letters: {
        ...state.letters,
        pageName
      }
    }
  }),
  on(DashboardActions.setInboxLetterList, (state, { letterList }) => {
    return {
      ...state,
      letters: {
        ...state.letters,
        inbox: letterList
      }
    }
  }),
  on(DashboardActions.setSentLetterList, (state, { letterList }) => {
    return {
      ...state,
      letters: {
        ...state.letters,
        sent: letterList
      }
    }
  }),
  on(DashboardActions.inboxLetterListSet, DashboardActions.sentLetterListSet, (state) => {
    return {
      ...state
    }
  }),
  on(DashboardActions.clearDashboardState, () => initialDashboardState),
);