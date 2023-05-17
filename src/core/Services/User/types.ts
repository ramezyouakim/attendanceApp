export type USER = {
    userID: string
    username: string
    email: string
    accessToken: string
    refreshToken: string
    last_seen_at: Date
    score: UserScore
}

export type UserScore = {
    total_score: number
    last_scan_at: Date
}