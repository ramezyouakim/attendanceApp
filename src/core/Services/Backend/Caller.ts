import i18n from "../../Localisation/i18n";
import Auth from "../Auth/Auth";
import { APPLanguages } from "../Common/types";
import { ErrorMessages, Errors } from "../ErrorHandler/constants";
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import User from "../User/User";
import { backendDomains, BackendUrlPaths, FetchMethods } from "./contants";

const fetchWithTimeout = (url, options, timeout = 5000) => {
    const controller = new AbortController();
    const { signal } = controller;

    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            controller.abort();
            reject(new Error(Errors.RequestTimeout));
        }, timeout);
    });

    const fetchPromise = fetch(url, { ...options, signal });

    return Promise.race([fetchPromise, timeoutPromise]);
};

export const makeRequest = async (url: string, method: FetchMethods, body?: {}) => {
    try {
        const user = new User()
        const token = user.accessToken
        const headers = new Headers(
            token
                ? {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
                : {
                    'Content-Type': 'application/json'
                }
        )
        const response = await fetchWithTimeout(url, {
            method: method,
            headers: headers,
            body: body && JSON.stringify(body)
        })
        return await handleRequestResponse(response, url, method, body)
    } catch (error) {
        console.log("makeRequest ", error)
        ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
    }
}

// const numberOfRetry = 3
const handleRequestResponse = async (response, url, method, body?) => {
    try {
        if (response) {
            console.log((response.status))
            switch (response.status) {
                case 200:
                case 201:
                    /* Handling Success */
                    return await response.json()
                case 204:
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
                    return null
                case 400: {
                    const errorMessageParse = await response.json()
                    const localErrorMessage = i18n.locale === APPLanguages.arabic ? errorMessageParse?.errorMessageAR : errorMessageParse?.errorMessageEN
                    const errorMessage = localErrorMessage || ErrorMessages.default.message
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, errorMessage)
                    return null
                }

                case 401:
                case 403:
                    /* Handling forbidden request */
                    //get refresh token
                    getRefreshToken(() => { makeRequest(url, method, body) })
                    return null
                case 404: {
                    /* Handling not found request */
                    const errorMessageParse = await response.json()
                    const localErrorMessage = i18n.locale === APPLanguages.arabic ? errorMessageParse?.errorMessageAR : errorMessageParse?.errorMessageEN
                    const errorMessage = localErrorMessage || ErrorMessages.default.message
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, errorMessage)
                    return null
                }
                case 500:
                    /* Handling internal server error */
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
                    return null
                default:
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
                    return null
            }
        } else {
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
            return null
        }
    } catch (error) {
        console.log("handleRequestResponse ", error)
        ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
    }
}

export const getUrlPath = (path: BackendUrlPaths) => {
    return backendDomains.backendURL + path
}

export const getRefreshToken = async (recall) => {

    try {
        const user = new User()
        const token = user.accessToken
        const headers = new Headers(
            token
                ? {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
                : {
                    'Content-Type': 'application/json'
                }
        )
        const response = await fetchWithTimeout(BackendUrlPaths.refreshToken, {
            method: FetchMethods.GET,
            headers: headers,
            body: JSON.stringify({
                email: user.email,
                refreshToken: user.refreshToken
            })
        })

        return await handleRefreshRequestResponse(response, recall)
    } catch (error) {
        console.log("getRefreshToken ", error)
        ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
    }
}

const handleRefreshRequestResponse = async (response, recall) => {
    try {
        const auth = new Auth()
        const user = new User()

        if (response) {
            switch (response.status) {
                case 200:
                case 201:
                    /* Handling Success */
                    const responseParse = await response.json()
                    user.accessToken = responseParse?.accessToken
                    user.refreshToken = responseParse?.refreshToken

                    return recall()
                case 204:
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
                    auth.logout()
                    return null
                case 400: {
                    const errorMessageParse = await response.json()
                    const localErrorMessage = i18n.locale === APPLanguages.arabic ? errorMessageParse?.errorMessageAR : errorMessageParse?.errorMessageEN
                    const errorMessage = localErrorMessage || ErrorMessages.default.message
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, errorMessage)
                    auth.logout()
                    return null
                }
                case 401:
                case 403:
                    /* Handling forbidden request */
                    ErrorHandler.showErrorMessage(ErrorMessages.unauthenticatedErrorMessage.title, ErrorMessages.unauthenticatedErrorMessage.message)
                    auth.logout()
                    return null
                case 404: {
                    /* Handling not found request */
                    const errorMessageParse = await response.json()
                    const localErrorMessage = i18n.locale === APPLanguages.arabic ? errorMessageParse?.errorMessageAR : errorMessageParse?.errorMessageEN
                    const errorMessage = localErrorMessage || ErrorMessages.default.message
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, errorMessage)
                    auth.logout()
                    return null
                }
                case 500:
                    /* Handling internal server error */
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
                    auth.logout()
                    return null
                default:
                    ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
                    auth.logout()
                    return null
            }
        } else {
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
            auth.logout()
            return null
        }
    } catch (error) {
        console.log("handleRefreshRequestResponse ", error)
        ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.default.message)
        const auth = new Auth()
        auth.logout()
    }
}