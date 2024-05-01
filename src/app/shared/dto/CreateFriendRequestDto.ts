export interface CreateFriendRequestDto {
    friendOf: string
    friendTo: string
    isAccepted: boolean
    from?: Date
}