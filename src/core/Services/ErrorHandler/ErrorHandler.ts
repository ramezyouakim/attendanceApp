import { Alert } from "react-native"
import { ErrorCodes } from "./types"

class ErrorHandler {
    private static instance: any
    private errorCode: ErrorCodes
    private errorMessage: string

    constructor() {
        if (ErrorHandler.instance) return ErrorHandler.instance

        ErrorHandler.instance = this
    }

    showErrorMessage = (errorCode, errorMessage) => {
        this.errorCode = errorCode
        this.errorMessage = errorMessage
        Alert.alert('', errorMessage)
    }

}

export default new ErrorHandler()