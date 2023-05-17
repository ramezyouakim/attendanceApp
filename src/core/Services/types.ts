export interface Service {
    index: number

    initialization(): Promise<void>
}

export interface ServiceLogoutHandler {
    logout: Function
}

export interface ServiceLoginHandler {
    login: Function
}