import { getUrlPath, makeRequest } from './Caller'
import { BackendUrlPaths, FetchMethods } from './contants'

export const api = {
    auth: {
        login: async (email: string, password: string) => {
            const url = getUrlPath(BackendUrlPaths.login)
            return await makeRequest(url, FetchMethods.POST, {
                email: email.toLowerCase(),
                password: password
            })
        },
        logout: async (refreshToken) => {
            const url = getUrlPath(BackendUrlPaths.logout)
            return await makeRequest(url, FetchMethods.POST, {
                refreshToken: refreshToken
            })
        },
    },
    user: {
        getUserInfo: async () => {
            const url = getUrlPath(BackendUrlPaths.userInfo)
            return await makeRequest(url, FetchMethods.GET)
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