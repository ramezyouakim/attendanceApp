import { Alert } from "react-native"
import { ErrorCodes } from "./types"

class ErrorHandler {
    private static instance: any
    private errorTitle: string
    private errorMessage: string

    constructor() {
        if (ErrorHandler.instance) return ErrorHandler.instance

        ErrorHandler.instance = this
    }

    showErrorMessage = (errorTitle, errorMessage) => {
        this.errorTitle = errorTitle
        this.errorMessage = errorMessage
        Alert.alert(errorTitle, errorMessage)
    }

}

export default new ErrorHandler()