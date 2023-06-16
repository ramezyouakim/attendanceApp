import Services from '../Main'
import { action, computed, makeObservable, observable } from "mobx"
import User from "../User/User"
import { api } from "../Backend/api"
import Common from '../Common/Common'
import Navigator from '../../../routes/Navigator'

class UserScore {
    private static instance

    user: User
    commonActions: Common
    @observable showCelebration: boolean = false

    constructor() {
        if (UserScore.instance) return UserScore.instance

        UserScore.instance = this

        this.user = new User()
        this.commonActions = new Common()
        makeObservable(this)
    }

    @action scanQrCode = async (qrCode) => {
        const response = await api.userScore.scanQrCode(qrCode)
        return response
    }

    @action setShowCelebration = (state) => {
        this.showCelebration = state
    }

    updateScore = (score: number) => {
        this.user.setTotalScore(score)
    }
}

export default UserScore