import { GoalType } from "../enums/goal-type.enum"

export interface Goal {
    id: string
    userId: string
    goalType: GoalType
    startDate: Date
    endDate: Date
    description: string
    isCompleted: boolean
}