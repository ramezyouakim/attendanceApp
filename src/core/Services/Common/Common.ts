import { Service } from "../types"
import { action, computed, makeObservable, observable } from "mobx"
import RNRestart from 'react-native-restart';
import { APPLanguages } from "./types";
import i18n from "../../Localisation/i18n";
import { I18nManager } from "react-native";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { ErrorMessages } from "../ErrorHandler/constants";
import { storeData } from "../../Utils/Storage";
import { getData } from "../../Utils/Storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { api } from "../Backend/api";
import { currentAppVersion } from "../../Config/AppVersion";
import UISharedStore from "../UISharedStore/UISharedStore";

class Common implements Service {
    index = 0
    private static instance

    @observable appLanguage: APPLanguages
    @observable remoteAppVersion: string
    private uiSharedStore: UISharedStore;


    constructor() {
        if (Common.instance) return Common.instance

        Common.instance = this
        this.uiSharedStore = new UISharedStore()
        makeObservable(this)
    }

    async initialization() {
        this.initGoogleSignin()
        await this.initLanguage()
        await this.initAppVersion()
    }

    async initAppVersion() {
        try {
            const response = await api.appInfo.appVersion()
            this.setRemoteAppVersion(response?.appVersion || currentAppVersion)
        } catch (error) {

        }
    }

    async initLanguage() {
        const storedLang: APPLanguages = await this.getLangDataFromStorage()

        if (storedLang) {
            this.changeAppRTL(storedLang)
            this.setAppLanguage(storedLang)
            return
        }

        const localLang = this.appLangLocale

        if (localLang == 'ar' || localLang == 'ar-US') {
            this.changeAppRTL(APPLanguages.arabic)
            this.setAppLanguage(APPLanguages.arabic)
        } else {
            this.changeAppRTL(APPLanguages.english)
            this.setAppLanguage(APPLanguages.english)
        }
    }

    @action setRemoteAppVersion(version: string) {
        this.remoteAppVersion = version
    }

    restartApp() {
        try {
            RNRestart.restart();
        } catch (error) {
            console.log(error)
        }
    }

    async changeAppLanguage(language: APPLanguages) {
        this.uiSharedStore.setLoadingOverlay(true)
        try {
            this.setAppLanguage(language)
            await this.writeLangDataToStorage(language)
            this.changeAppRTL(language)
            this.uiSharedStore.setLoadingOverlay(false)
            this.restartApp()
        } catch (error) {
            console.log(error)
            this.uiSharedStore.setLoadingOverlay(false)
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
        }
        this.uiSharedStore.setLoadingOverlay(false)
    }

    changeAppRTL(language: APPLanguages) {
        try {
            if (language === APPLanguages.arabic) {
                I18nManager.forceRTL(true);
            } else {
                I18nManager.forceRTL(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    @action async setAppLanguage(language: APPLanguages) {
        this.appLanguage = language
        this.setI18nLocal(language)
    }

    setI18nLocal(language: APPLanguages) {
        i18n.defaultLocale = language
        i18n.locale = language
    }

    @computed get appLangLocale() {
        return i18n.locale
    }

    @computed get appLangStorageKey() {
        return 'app:language'
    }

    private async writeLangDataToStorage(language: APPLanguages) {
        await storeData(this.appLangStorageKey, language)
    }

    private async getLangDataFromStorage() {
        return await getData(this.appLangStorageKey)
    }

    private initGoogleSignin() {
        GoogleSignin.configure({
            // scopes: [''], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '304470075083-sdrb57rvp6fprp3ds4rtigmhv1nr82hg.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            // hostedDomain: '', // specifies a hosted domain restriction
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            // accountName: '', // [Android] specifies an account name on the device that should be used
            iosClientId: '304470075083-q003tu3vqsrgsp408lnuin09ki0le3ta.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
            // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
            profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
        });
    }
}

export default Common