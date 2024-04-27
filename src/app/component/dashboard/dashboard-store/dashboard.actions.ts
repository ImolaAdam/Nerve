import { createAction, props } from '@ngrx/store';
import { Letter } from 'src/app/shared/models/letter.model';

export const setDashboardMenu = createAction('[Dashboard] Set Dashboard Menu', props<{ menuName: string }>());
export const dashboardMenuSet = createAction('[Dashboard] Dashboard Menu Is Set');
export const clearDashboardState = createAction('[Dashboard] Clear State');

export const setLetterPage = createAction('[Dashboard] Set Letter Page', props<{ pageName: string }>());
export const setInboxLetterList = createAction('[Dashboard] Set Inbox Letter List', props<{ letterList: Letter[] }>());
export const setSentLetterList = createAction('[Dashboard] Set Sent Letter List', props<{ letterList: Letter[] }>());

export const inboxLetterListSet = createAction('[Dashboard] Inbox Letter List Is Set');
export const sentLetterListSet = createAction('[Dashboard] Sent Letter List Is Set');