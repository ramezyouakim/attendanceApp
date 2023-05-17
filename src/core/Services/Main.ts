
import Common from "./Common/Common"
import { Service, ServiceLoginHandler, ServiceLogoutHandler } from "./types"

class Services {
    private static instance: any
    private initializationQueue: Service[]
    private loginQueue: ServiceLoginHandler[]
    private logoutQueue: ServiceLogoutHandler[]

    constructor() {
        this.initializationQueue = [

        ]
        this.loginQueue = []
        this.logoutQueue = []

        if (Services.instance) return Services.instance

        Services.instance = this
    }

    registerService(element: Service) {
        this.initializationQueue.push(element)
    }

    initializatServices(): void { //after user login
        try {
            function compare(a, b) {
                if (a.index < b.index) {
                    return -1;
                }
                if (a.index > b.index) {
                    return 1;
                }
                return 0;
            }
            this.initializationQueue.sort(compare).forEach(item => { item.initialization && item.initialization() })
        } catch (error) {
            console.error(error)
        }
    }

    registerLoginHandler(element: ServiceLoginHandler) {
        this.loginQueue.push(element)
    }

    registerLogoutHandler(element: ServiceLogoutHandler) {
        this.logoutQueue.push(element)
    }

    async login(): Promise<void> {
        try {
            this.loginQueue.forEach(item => { item.login && item.login() })
        } catch (error) {
            console.error(error)
        }
    }

    async logout(): Promise<void> {
        try {
            this.logoutQueue.forEach(item => { item.logout && item.logout() })
        } catch (error) {
            console.error(error)
        }
    }
}

export default new Services()