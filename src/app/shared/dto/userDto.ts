import { Timestamp } from "firebase/firestore";
import { UserRank } from "../enums/user-rank.enum";

export interface UserDto {
    userId?: string
    email: string
    userName: string
    birthday: Date | Timestamp
    role: 'Beginner' | 'Medium' | 'Expert'
}