import Constants from "expo-constants"
import * as Application from 'expo-application'

const currentAppVersion = Constants.manifest?.version || '1.0.0'
const nativeAppVersion = String(Application.nativeApplicationVersion)

export {
    currentAppVersion,
    nativeAppVersion
}