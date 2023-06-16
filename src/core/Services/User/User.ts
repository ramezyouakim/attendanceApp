import { Service } from "../types"
import { UserScore } from "./types"
import Services from '../Main'
import { action, computed, makeObservable, observable } from "mobx"
import { deleteData, getData, storeData } from "../../Utils/Storage"
import CryptoJS from "react-native-crypto-js";
import { KEYSEN } from "../Backend/contants"
import { api } from "../Backend/api"

class User implements Service {
    index = 1
    private static instance
    email: string
    userID: string
    fullname: string
    accessToken: string
    refreshToken: string
    last_seen_at: Date
    phonenumber: string
    @observable score: UserScore
    @observable loggedIn: boolean
    @observable loading: boolean

    constructor() {
        if (User.instance) return User.instance

        User.instance = this

        // Services.registerService(this)
        // Services.registerLoginHandler(this)
        Services.registerLogoutHandler(this)

        makeObservable(this)
    }

    async initialization() {
        try {
            this.setLoading(true)
            const token = await this.getStoredTokens()

            if (!token || Object.keys(token)?.length === 0) {
                this.setLoading(false)
                return
            }

            this.accessToken = token.accessToken
            this.refreshToken = token.refreshToken

            const userInfo = await this.getUserInfo()

            if (!userInfo) {
                await deleteData(this.userStorageKey)
                this.setLoading(false)
                return
            }

            await this.setUser({ ...userInfo, accessToken: token.accessToken, refreshToken: token.refreshToken })
            this.setLoading(false)
        } catch (error) {
            console.log(error)
            this.setLoading(false)
        }
    }

    async getUserInfo() {
        const response = await api.user.getUserInfo()

        if (!response) return null

        return response
    }

    resetUser = async () => {
        this.setLoading(true)
        await this.setUser({
            email: null,
            _id: null,
            fullname: null,
            accessToken: null,
            refreshToken: null,
            last_seen_at: null,
            score: {
                total_score: 0,
                last_scan_at: null
            },
            phonenumber: null
        })
        this.setLoading(false)
    }

    async logout() {
        await this.resetUser()
        await deleteData(this.userStorageKey)
    }

    async setUser(user) {
        this.setLoading(true)
        this.email = user?.email
        this.userID = user?._id
        this.fullname = user?.fullname
        this.accessToken = user?.accessToken
        this.refreshToken = user?.refreshToken
        this.last_seen_at = user?.last_seen_at
        this.score = user?.score
        this.phonenumber = user?.phonenumber
        await this.writeUserDataToStorage()
        this.setIsLoggedIn(Boolean(user?.accessToken && user?.refreshToken))
        this.setLoading(false)
    }

    @computed get isLoggedIn(): Boolean {
        return Boolean(this.loggedIn) && Boolean(this.phonenumber)
    }

    @action private setIsLoggedIn(state: boolean) {
        this.loggedIn = state
    }

    @action setLoading(state: boolean) {
        this.loading = state
    }

    private async writeUserDataToStorage() {
        // const accessTokenData = CryptoJS.SHA256.encrypt(this.accessToken, KEYSEN.tokenSecret).toString();
        // const refreshTokenData = CryptoJS.SHA256.encrypt(this.refreshToken, KEYSEN.tokenSecret).toString();

        await storeData(this.userStorageKey, { accessToken: this.accessToken, refreshToken: this.refreshToken })
    }

    private async getStoredTokens() {
        const tokensEncrypted = await getData(this.userStorageKey)
        if (!tokensEncrypted || tokensEncrypted?.length < 1 || Object.keys(tokensEncrypted)?.length === 0) return null

        const accessToken = tokensEncrypted?.accessToken
        const refreshToken = tokensEncrypted?.refreshToken

        if (!accessToken || !refreshToken) return null

        return { accessToken, refreshToken }
    }

    @action setTotalScore(newScore: number) {
        this.score.total_score = newScore
    }

    private get userStorageKey() {
        return "userT"
    }
}

export default User