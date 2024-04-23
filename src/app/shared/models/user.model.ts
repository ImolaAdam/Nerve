import { UserRank } from "../enums/user-rank.enum";

export interface User { 
    email: string
    password: string
    userName: string
    birthday: Date
    role: UserRank
}