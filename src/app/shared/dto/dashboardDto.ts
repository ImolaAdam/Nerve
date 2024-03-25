import { UserRank } from "../enums/user-rank.enum";
import { Goal } from "../models/goal.model";

export interface DashboardDto {
    userId: string,
    weeklyGoals: Array<Goal>,
    dailyGoals: Array<Goal>,
    monthlyyGoals: Array<Goal>,
    yearlyGoals: Array<Goal>,
    rank: UserRank,
    coffeeCounter: number
}