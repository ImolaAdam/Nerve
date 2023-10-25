export interface UserAuthDto { 
    authUserId: string | null;
    email: string | null;
    userName: string | null;
    familyName?: string | null;
    givenName?: string | null;
    birtday: Date,
    role: string
}