export const AuthRoutes = {
    login: 'LoginScreen',
    registrationScreen: 'RegistrationScreen'
} as const

export const MainRoutes = {
    home: 'HomeScreen',
    qrSanner: 'QRSannerScreen',
    sucess: 'SucessScreen',
    aboutUs: 'AboutUsScreen'
} as const

export const CoreRoutes = {
    updateApp: 'UpdateAppScreen',
    fallback: 'FallbackScreen'
} as const

export const MainNavs = {
    mainStack: 'mainStack',
    authStack: 'authStack'
} as const

export const Routes = {
    [MainNavs.authStack]: AuthRoutes,
    [MainNavs.mainStack]: MainRoutes,
    coreStack: CoreRoutes
} as const

