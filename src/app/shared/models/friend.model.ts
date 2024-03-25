export interface Friend {
    id: string
    from: Date
    friendOf: string
    friendTo: string
    isAccepted: boolean
}

//friendOf and to -> email