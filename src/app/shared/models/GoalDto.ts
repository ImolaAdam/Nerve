export interface GoalDto {
    id: string
    userId: string
    goalType: string //Todo enum (yearly -> max 3, weekly, monthly, daily)
    startDate: Date
    endDate: Date
    description: string
    isCompleted: boolean
}