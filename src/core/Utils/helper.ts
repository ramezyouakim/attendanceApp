import { Platform } from "react-native"

export const validatePhoneNumber = (phonenumber: string): boolean => {
    if (!phonenumber || phonenumber?.length < 1) return false

    let number = phonenumber
    let first2digits = number.slice(0, 2)

    if (first2digits == '+2') {
        const temp = number.replace('+2', '')
        number = temp
        first2digits = number.slice(0, 2)
    }

    if (first2digits !== '01' || number.length !== 11) return false

    return true
}

export const isAndroid = Platform.OS == 'android'
export const isIOS = Platform.OS == 'ios'