import Services from '../Main'
import { action, computed, makeObservable, observable } from "mobx"
import User from "../User/User"
import { api } from "../Backend/api"
import Common from '../Common/Common'
import Navigator from '../../../routes/Navigator'

class UISharedStore {
    private static instance

    @observable loadingOverlay: boolean
    

    constructor() {
        if (UISharedStore.instance) return UISharedStore.instance

        UISharedStore.instance = this
        this.loadingOverlay = false
        makeObservable(this)
    }

    @action setLoadingOverlay(state: boolean) {
        this.loadingOverlay = state
    }
}

export default UISharedStore