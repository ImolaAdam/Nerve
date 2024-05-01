import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions'
import { Letter } from 'src/app/shared/models/letter.model';
import { Goal } from 'src/app/shared/models/goal.model';
import { Friend } from 'src/app/shared/models/friend.model';
import { UserDto } from 'src/app/shared/dto/userDto';

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
  friends: {
    allUsers: UserDto[],
    friendRequests: Friend[],
    friends: Friend[]
  }
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
  },
  friends: {
    allUsers: [],
    friendRequests: [],
    friends: []
  }
};

export const dashboardReducer = createReducer(
  initialDashboardState,
  on(DashboardActions.setErrorMessage, (state, { error }) => {
    return {
      ...state,
      error
    }
  }),
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
  on(DashboardActions.allUsersSet, (state, { allUsers }) => {
    return {
      ...state,
      friends: {
        ...state.friends,
        allUsers
      }
    }
  }),
  on(DashboardActions.allFriendsSet, (state, { friends }) => {
    return {
      ...state,
      friends: {
        ...state.friends,
        friends
      }
    }
  }),
  on(DashboardActions.friendRequestSet, (state, { friendRequests }) => {
    return {
      ...state,
      friends: {
        ...state.friends,
        friendRequests
      }
    }
  }),
  on(
    DashboardActions.inboxLetterListSet, DashboardActions.sentLetterListSet,
    DashboardActions.dailyGoalsSet, DashboardActions.weeklyGoalsSet,
    DashboardActions.monthlyGoalsSet, DashboardActions.yearlyGoalsSet,
    DashboardActions.getAllUsers, DashboardActions.getAllFriends, DashboardActions.getFriendRequests,
    (state) => {
    return {
      ...state
    }
  }),
  on(DashboardActions.clearDashboardState, () => initialDashboardState),
);