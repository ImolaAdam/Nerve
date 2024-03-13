import { createAction, props } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';

export const firebaseLoginStart = createAction('[Auth] Firebase Login Start', props<{ email: string, password: string}>());
export const loggedInWithFirebase = createAction('[Auth] Logged In With Firebase', props<{ user: User }>());
export const firebaseLoginError = createAction('[Auth] Firebase Login Error', props<{ errorMessage: string }>());

export const logout = createAction('[Auth] Logout');

export const registerWithFirebaseStart = createAction('[Auth] Firebase Registration Start', props<{ email: string, password: string}>());
export const registrationError = createAction('[Auth] Registration Error', props<{ errorMessage: string }>());

export const forgotPassword = createAction('[Auth] Forgot Password', props<{ email: string }>());
export const resetPasswordError = createAction('[Auth] Reset Password Error', props<{ errorMessage: string }>());
