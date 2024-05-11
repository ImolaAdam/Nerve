export interface CalendarEventDto {
    documentId?: string
    start: Date
    end: Date
    title: string
    color: any
    resizable: {
        beforeStart: boolean,
        afterEnd: boolean
    }
    draggable: boolean
}