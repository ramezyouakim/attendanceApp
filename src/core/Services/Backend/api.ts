import { getUrlPath, makeRequest } from './Caller'
import { BackendUrlPaths, FetchMethods } from './contants'

export const api = {
    appInfo: {
        appVersion: async () => {
            const url = getUrlPath(BackendUrlPaths.appVersion)
            return await makeRequest(url, FetchMethods.GET)
        },
    },
    auth: {
        createAccount: async (email: string, password: string, fullname: string, phonenumber: string) => {
            const url = getUrlPath(BackendUrlPaths.createAccount)
            return await makeRequest(url, FetchMethods.POST, {
                email: email.toLowerCase(),
                password: password,
                fullname: fullname,
                phonenumber: phonenumber
            })
        },
        login: async (email: string, password: string) => {
            const url = getUrlPath(BackendUrlPaths.login)
            return await makeRequest(url, FetchMethods.POST, {
                email: email.toLowerCase(),
                password: password
            })
        },
        googleSignin: async (google_id: string, google_token: string) => {
            const url = getUrlPath(BackendUrlPaths.googleAuth)
            return await makeRequest(url, FetchMethods.POST, {
                google_id: google_id,
                google_token: google_token
            })
        },
        logout: async (refreshToken) => {
            const url = getUrlPath(BackendUrlPaths.logout)
            return await makeRequest(url, FetchMethods.POST, {
                refreshToken: refreshToken
            })
        },
        forgotPassoword: async (email: string) => {
            const url = getUrlPath(BackendUrlPaths.forgotPassoword)
            return await makeRequest(url, FetchMethods.POST, {
                email: email
            })
        },
        verfiyPasswordOTP: async (email: string, OTPCode: string) => {
            const url = getUrlPath(BackendUrlPaths.verfiyPasswordOTP)
            return await makeRequest(url, FetchMethods.POST, {
                email: email,
                otp_code: OTPCode
            })
        },
        resetPassoword: async (email: string, OTPCode: string, newPassword: string) => {
            const url = getUrlPath(BackendUrlPaths.resetPassoword)
            return await makeRequest(url, FetchMethods.POST, {
                email: email,
                otp_code: OTPCode,
                new_password: newPassword
            })
        },
    },
    user: {
        getUserInfo: async () => {
            const url = getUrlPath(BackendUrlPaths.userInfo)
            return await makeRequest(url, FetchMethods.GET)
        },
        updatePhoneNumber: async (phonenumber: string) => {
            const url = getUrlPath(BackendUrlPaths.updatePhoneNumber)
            return await makeRequest(url, FetchMethods.POST, {
                phonenumber: phonenumber
            })
        }
    },
    userScore: {
        scanQrCode: async (qrCode) => {
            const url = getUrlPath(BackendUrlPaths.userScroeScan)
            return await makeRequest(url, FetchMethods.POST, {
                qr_code: qrCode
            })
        }
    }
}