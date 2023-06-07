import Constants from "expo-constants"
import * as Application from 'expo-application'
import Common from "../Services/Common/Common"



const currentAppVersion = Constants.manifest?.version || '1.0.0'
const nativeAppVersion = String(Application.nativeApplicationVersion)

const shouldUpdateApp = () => {
    const commonService = new Common()
    return currentAppVersion < commonService.remoteAppVersion
}

export {
    currentAppVersion,
    nativeAppVersion,
    shouldUpdateApp
}