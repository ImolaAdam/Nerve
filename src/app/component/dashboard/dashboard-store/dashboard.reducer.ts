import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions'
import { Letter } from 'src/app/shared/models/letter.model';
import { Goal } from 'src/app/shared/models/goal.model';

export const DASHBOARD_STATE_NAME = 'dashboard';

export interface DashboardState {
  error: string | null;
  currentMenu: string;
  letters: {
    pageName: string,
    inbox: Letter[],
    sent: Letter[]
  };
  goals: {
    dailyGoals: Goal[],
    weeklyGoals: Goal[],
    monthlyGoals: Goal[],
    yearlyGoals: Goal[]
  };
}

export const initialDashboardState: DashboardState = {
  error: null,
  currentMenu: 'Dashboard',
  letters: {
    pageName: 'Inbox',
    inbox: [],
    sent: []
  },
  goals: {
    dailyGoals: [],
    weeklyGoals: [],
    monthlyGoals: [],
    yearlyGoals: []
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
  on(DashboardActions.setDailyGoals, (state, { dailyGoals }) => {
    return {
      ...state,
      goals: {
        ...state.goals,
        dailyGoals
      }
    }
  }),
  on(DashboardActions.setWeeklyGoals, (state, { weeklyGoals }) => {
    return {
      ...state,
      goals: {
        ...state.goals,
        weeklyGoals
      }
    }
  }),
  on(DashboardActions.setMonthlyGoals, (state, { monthlyGoals }) => {
    return {
      ...state,
      goals: {
        ...state.goals,
        monthlyGoals
      }
    }
  }),
  on(DashboardActions.setYearlyGoals, (state, { yearlyGoals }) => {
    return {
      ...state,
      goals: {
        ...state.goals,
        yearlyGoals
      }
    }
  }),
  on(
    DashboardActions.inboxLetterListSet, DashboardActions.sentLetterListSet,
    DashboardActions.dailyGoalsSet, DashboardActions.weeklyGoalsSet,
    DashboardActions.monthlyGoalsSet, DashboardActions.yearlyGoalsSet,
    (state) => {
    return {
      ...state
    }
  }),
  on(DashboardActions.clearDashboardState, () => initialDashboardState),
);