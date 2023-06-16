export enum BackendUrlPaths {
    appVersion = '/app_version',
    login = '/thegatekeeper/signinWorrier',
    createAccount = '/thegatekeeper/signupWorrier',
    googleAuth = '/thegatekeeper/google',
    forgotPassoword = '/thegatekeeper/forget_password',
    verfiyPasswordOTP = '/thegatekeeper/forget_password_verfiy',
    resetPassoword = '/thegatekeeper/reset_password',
    logout = '/thegatekeeper/logout',
    refreshToken = '/thegatekeeper/refreshWorrier',
    userInfo = '/user_info',
    updatePhoneNumber = '/user_info/updatePhoneNumber',
    userScroeScan = '/user_score/scan_qr_code'
}

export const backendDomains = {
    backendURL: "http://13.39.229.162"
}

export enum FetchMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum KEYSEN {
    tokenSecret = 'dsSSDm23Wmklsa'
}