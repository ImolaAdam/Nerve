export interface Letter {
    id: string
    sentAt: Date
    sentBy: string
    isSeen: boolean
    header: string
    content: string
}