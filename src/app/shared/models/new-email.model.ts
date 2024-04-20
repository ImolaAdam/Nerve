export interface NewEmail {
    sentTo: string
    sentAt: Date
    sentBy: string
    isSeen: boolean
    header: string
    content: string
}