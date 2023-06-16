import Services from '../Main'
import { action, makeObservable } from "mobx"
import User from "../User/User"
import { api } from "../Backend/api"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import { ErrorMessages } from '../ErrorHandler/constants'
import Navigator from '../../../routes/Navigator'
import { AuthRoutes } from '../../../routes/Routes'
import UISharedStore from '../UISharedStore/UISharedStore'
import { Alert } from 'react-native';
import i18n from '../../Localisation/i18n';

class Auth {
    private static instance

    user: User
    private uiSharedStore: UISharedStore

    constructor() {
        if (Auth.instance) return Auth.instance

        Auth.instance = this

        this.user = new User()
        this.uiSharedStore = new UISharedStore()
        makeObservable(this)
    }

    @action login = async (email, password) => {
        this.uiSharedStore.setLoadingOverlay(true)
        // const cryptr = new Cryptr("pAsSkalmtelser5", { pbkdf2Iterations: 10000, saltLength: 10 });
        // const encryptedPassword = cryptr.encrypt(password);

        const response = await api.auth.login(email, password)
        if (response) {
            await this.setUser(response)
        }
        this.uiSharedStore.setLoadingOverlay(false)
    }

    @action async setUser(response) {
        await this.user.setUser(response)
        await Services.login()
    }

    @action createAccount = async (email, password, fullname, phonenumber) => {
        this.uiSharedStore.setLoadingOverlay(true)
        // const cryptr = new Cryptr("pAsSkalmtelser5", { pbkdf2Iterations: 10000, saltLength: 10 });
        // const encryptedPassword = cryptr.encrypt(password);

        const response = await api.auth.createAccount(email, password, fullname, phonenumber)
        if (response) {
            await this.setUser(response)
        }
        this.uiSharedStore.setLoadingOverlay(false)
    }

    logout = async () => {
        this.uiSharedStore.setLoadingOverlay(true)

        const response = await api.auth.logout(this.user.refreshToken)
        if (!response) {
            this.uiSharedStore.setLoadingOverlay(false)
            return
        }

        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }

        await Services.logout()
        this.uiSharedStore.setLoadingOverlay(false)
    }

    @action googleAuth = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { user: { id }, idToken } = userInfo
            if (id && idToken) {
                this.uiSharedStore.setLoadingOverlay(true)
                const response = await api.auth.googleSignin(id, idToken)

                if (response) {
                    if (!response?.phonenumber) {
                        await this.user.setUser(response)
                        Navigator.navigateTo(AuthRoutes.addPhoneNumber, {
                            shouldCallSetUser: true
                        })
                    } else {
                        await this.setUser(response)
                    }
                    this.uiSharedStore.setLoadingOverlay(false)
                } else {
                    throw 'no response'
                }
            } else {
                throw 'no data'
            }
        } catch (error) {
            this.uiSharedStore.setLoadingOverlay(false)
            console.log(error)

            if (error.code === statusCodes.SIGN_IN_CANCELLED || error.code === -5) return
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
            // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            //     // user cancelled the login flow
            // } else if (error.code === statusCodes.IN_PROGRESS) {
            //     // operation (e.g. sign in) is in progress already
            // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            //     // play services not available or outdated
            // } else {
            //     // some other error happened
            // }
        }
    };

    @action async updatePhoneNumberOnCloud(phonenumber: string) {
        this.uiSharedStore.setLoadingOverlay(true)

        const response = await api.user.updatePhoneNumber(phonenumber)

        if (response) {
            //workaround need to refactor
            this.user.setLoading(true)
            await this.setUser(response)
            this.user.setLoading(false)
        }

        this.uiSharedStore.setLoadingOverlay(false)
    }

    @action async forgotPassword(email: string) {
        this.uiSharedStore.setLoadingOverlay(true)

        const response = await api.auth.forgotPassoword(email)

        if (response) {
            Navigator.navigateTo(AuthRoutes.verfiyPasswordOTP, { email: email })
        }

        this.uiSharedStore.setLoadingOverlay(false)
    }

    @action async verfiyPasswordOTP(email: string, OTPCode: string) {
        this.uiSharedStore.setLoadingOverlay(true)

        const response = await api.auth.verfiyPasswordOTP(email, OTPCode)

        if (response) {
            Navigator.navigateTo(AuthRoutes.resetPassword, { email: email, OTPCode: response.resetPassowrdOTP })
        }

        this.uiSharedStore.setLoadingOverlay(false)
    }

    @action async resetPassowrd(email: string, OTPCode: string, newPassword: string) {
        this.uiSharedStore.setLoadingOverlay(true)

        const response = await api.auth.resetPassoword(email, OTPCode, newPassword)

        if (response) {
            //show sucess message
            Alert.alert(i18n.t('auth.reset_passoword.success'))
            Navigator.reset({ routeName: AuthRoutes.login })
        }

        this.uiSharedStore.setLoadingOverlay(false)
    }
}

export default Auth