export interface Friend {
    id: string
    friendOf: string
    friendTo: string
    isAccepted: boolean
    from?: Date
}
