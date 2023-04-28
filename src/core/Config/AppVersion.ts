import Constants from "expo-constants"
import * as Application from 'expo-application'

const currentAppVersion = Constants.manifest?.version || '1.0.0'
const nativeAppVersion = String(Application.nativeApplicationVersion)

const shouldUpdateApp = () => {
    return currentAppVersion < '1.0.0'
}

export {
    currentAppVersion,
    nativeAppVersion,
    shouldUpdateApp
}