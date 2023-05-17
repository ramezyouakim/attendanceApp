import { Service } from "../types"
import { action, computed, makeObservable, observable } from "mobx"
import RNRestart from 'react-native-restart';
import * as Localisation from 'expo-localization';
import { APPLanguages } from "./types";
import i18n from "../../Localisation/i18n";
import { I18nManager } from "react-native";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { ErrorMessages } from "../ErrorHandler/constants";
import { storeData } from "../../Utils/Storage";
import { getData } from "../../Utils/Storage";

class Common implements Service {
    index = 0
    private static instance

    @observable loadingOverlay: boolean
    @observable appLanguage: APPLanguages

    constructor() {
        if (Common.instance) return Common.instance

        Common.instance = this

        makeObservable(this)

        this.loadingOverlay = false
    }

    async initialization() {
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

    @action setLoadingOverlay(state: boolean) {
        this.loadingOverlay = state
    }

    restartApp() {
        try {
            RNRestart.restart();
        } catch (error) {
            console.log(error)
        }
    }

    async changeAppLanguage(language: APPLanguages) {
        this.setLoadingOverlay(true)
        try {
            this.setAppLanguage(language)
            await this.writeLangDataToStorage(language)
            this.changeAppRTL(language)
            this.setLoadingOverlay(false)
        } catch (error) {
            console.log(error)
            this.setLoadingOverlay(false)
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
        }
        this.setLoadingOverlay(false)
    }

    changeAppRTL(language: APPLanguages) {
        try {
            if (language === APPLanguages.arabic) {
                I18nManager.forceRTL(true);
            } else {
                I18nManager.forceRTL(false);
            }
            this.restartApp()
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
}

export default Common