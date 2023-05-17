export enum BackendUrlPaths {
    login = '/thegatekeeper/signinWorrier',
    logout = '/thegatekeeper/logout',
    refreshToken = '/thegatekeeper/refreshWorrier',
    userInfo = '/thegatekeeper/userInfo',
    userScroeScan = '/user_score/scan_qr_code'
}

export const backendDomains = {
    backendURL: "http://192.168.100.48:5000"
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