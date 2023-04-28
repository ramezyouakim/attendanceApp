export const AuthRoutes = {
    login: 'LoginScreen',
    registrationScreen: 'RegistrationScreen'
} as const

export const MainRoutes = {
    home: 'HomeScreen',
    qrSanner: 'QRSannerScreen',
    sucess: 'SucessScreen'
} as const

export const CoreRoutes = {
    updateApp: 'UpdateAppScreen',
    fallback: 'FallbackScreen'
} as const

export const Routes = {
    authStack: AuthRoutes,
    mainStack: MainRoutes,
    coreStack: CoreRoutes
} as const
