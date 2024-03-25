import { UserRank } from "../enums/user-rank.enum";

export interface User { 
    authUserId: string;
    email: string;
    userName: string;
    birtday: Date,
    role: UserRank
}