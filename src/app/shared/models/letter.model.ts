import { Timestamp } from "firebase/firestore"

// Todo: letterFromFirebase
export interface Letter {
    id: string
    sentTo: string
    sentAt: Date
    sentBy: string
    isSeen: boolean
    header: string
    content: string
}