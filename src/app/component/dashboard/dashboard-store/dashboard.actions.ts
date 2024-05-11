import { createAction, props } from '@ngrx/store';
import { CalendarEventDto } from 'src/app/shared/dto/CalendarEventDto';
import { UserDto } from 'src/app/shared/dto/userDto';
import { Friend } from 'src/app/shared/models/friend.model';
import { Goal } from 'src/app/shared/models/goal.model';
import { Letter } from 'src/app/shared/models/letter.model';


export const setErrorMessage = createAction('[Dashboard] Error Message Catched', props<{ error: string }>());

// Dashboard
export const setDashboardMenu = createAction('[Dashboard] Set Dashboard Menu', props<{ menuName: string }>());
export const dashboardMenuSet = createAction('[Dashboard] Dashboard Menu Is Set');
export const clearDashboardState = createAction('[Dashboard] Clear State');

// Emails
export const setLetterPage = createAction('[Dashboard] Set Letter Page', props<{ pageName: string }>());
export const setInboxLetterList = createAction('[Dashboard] Set Inbox Letter List', props<{ letterList: Letter[] }>());
export const setSentLetterList = createAction('[Dashboard] Set Sent Letter List', props<{ letterList: Letter[] }>());
export const inboxLetterListSet = createAction('[Dashboard] Inbox Letter List Is Set');
export const sentLetterListSet = createAction('[Dashboard] Sent Letter List Is Set');

// Goals
export const setDailyGoals = createAction('[Dashboard] Set Daily Goals', props<{ dailyGoals: Goal[] }>());
export const setWeeklyGoals = createAction('[Dashboard] Set Weekly Goals', props<{ weeklyGoals: Goal[] }>());
export const setMonthlyGoals = createAction('[Dashboard] Set Monthly Goals', props<{ monthlyGoals: Goal[] }>());
export const setYearlyGoals = createAction('[Dashboard] Set Yearly Goals', props<{ yearlyGoals: Goal[] }>());

export const dailyGoalsSet = createAction('[Dashboard] Daily Goals Are Set');
export const weeklyGoalsSet = createAction('[Dashboard] Weekly Goals Are Set');
export const monthlyGoalsSet = createAction('[Dashboard] Monthly Goals Are Set');
export const yearlyGoalsSet = createAction('[Dashboard] Yearly Goals Are Set');

//Friends
export const getAllUsers = createAction('[Dashboard] Get All Users');
export const allUsersSet = createAction('[Dashboard] All Users Set', props<{ allUsers: UserDto[] }>());

export const getFriendRequests = createAction('[Dashboard] Get Friend Requests');
export const friendRequestSet = createAction('[Dashboard] Friend Requests Set', props<{ friendRequests: Friend[] }>());

export const getAllFriends = createAction('[Dashboard] Get All Friends');
export const allFriendsSet = createAction('[Dashboard] All Friends Set', props<{ friends: Friend[] }>());

// Calendar
export const getMonthlyEvents = createAction('[Dashboard] Get Monthly Events');
export const monthlyEventsset = createAction('[Dashboard] Monthly Events Set', props<{ monthlyEvents: CalendarEventDto[] }>());

