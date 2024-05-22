import { createAction, props } from '@ngrx/store';
import { UserDto } from 'src/app/shared/dto/userDto';

export const login = createAction('[Auth] Firebase Login', props<{ user: UserDto }>());
export const logout = createAction('[Auth] Firebase Logout');
export const setErrorMessage = createAction('[Auth] Error Occured', props<{ error: string }>());

export const setStudiedHours = createAction('[Auth] Error Occured', props<{ studiedHours: number }>());

