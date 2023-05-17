import Services from '../Main'
import { action, computed, makeObservable, observable } from "mobx"
import User from "../User/User"
import { api } from "../Backend/api"
import Common from '../Common/Common'

class Auth {
    private static instance

    user: User
    commonActions: Common

    constructor() {
        if (Auth.instance) return Auth.instance

        Auth.instance = this

        this.user = new User()
        this.commonActions = new Common()
        makeObservable(this)
    }

    @action login = async (email, password) => {
        this.commonActions.setLoadingOverlay(true)
        // const cryptr = new Cryptr("pAsSkalmtelser5", { pbkdf2Iterations: 10000, saltLength: 10 });
        // const encryptedPassword = cryptr.encrypt(password);

        const response = await api.auth.login(email, password)
        if (response) {
            await this.user.setUser(response)
            await Services.login()
        }
        this.commonActions.setLoadingOverlay(false)
    }

    logout = async () => {
        this.commonActions.setLoadingOverlay(true)

        const response = await api.auth.logout(this.user.refreshToken)
        if (!response) {
            this.commonActions.setLoadingOverlay(false)
            return
        }

        await this.user.setUser({
            email: null,
            _id: null,
            fullname: null,
            accessToken: null,
            refreshToken: null,
            last_seen_at: null,
            score: null
        })
        await Services.logout()
        this.commonActions.setLoadingOverlay(false)
    }
}

export default Auth