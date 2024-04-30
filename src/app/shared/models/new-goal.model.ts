
export interface NewGoal {
    userId: string
    goalType: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'
    startDate: Date
    endDate: Date | null
    description: string
    isCompleted: boolean
}