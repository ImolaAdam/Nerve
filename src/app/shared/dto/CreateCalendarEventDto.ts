export interface CreateCalendarEventDto {
    userId: string;
    startDate: Date;
    endDate: Date;
    name: string;
    isImportant: boolean
}