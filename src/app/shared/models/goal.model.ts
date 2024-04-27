import { GoalType } from "../enums/goal-type.enum"

export interface Goal {
    id: string
    userId: string
    //goalType: GoalType
    goalType: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'
    startDate: Date
    endDate: Date
    description: string
    isCompleted: boolean
}