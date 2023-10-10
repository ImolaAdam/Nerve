import { createAction, props } from '@ngrx/store';

export const setDashboardMenu = createAction('[Dashboard] Set Menu', props<{ menuName: string }>());
export const dashboardMenuSet = createAction('[Dashboard] Menu Is Set');
export const clearDashboardState = createAction('[Dashboard] Clear State');
