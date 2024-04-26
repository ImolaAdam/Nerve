import { createAction, props } from '@ngrx/store';

export const loading = createAction('[App] Loading');
export const loaded = createAction('[App] Loading');
export const catchError = createAction('[App] Error Catched', props<{ error: string }>());
