import * as React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Navigator from './Navigator';
import { MainNavs, Routes } from './Routes';
import UpdateApp from '../modules/UpdateApp/UpdateApp';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { observer } from 'mobx-react';
import User from '../core/Services/User/User';
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native';
import UISharedStore from '../core/Services/UISharedStore/UISharedStore';

const userService = new User()
const uiShareStore = new UISharedStore()

const AppNavigator = () => {
    const navigationRef = useNavigationContainerRef()

    React.useEffect(() => {
        onRefChange(navigationRef)
        userService.initialization()
    }, [navigationRef])

    const onRefChange = (ref) => {
        if (ref) {
            Navigator.setNavigtor = ref
        }
    }

    if ((userService.loading) || (uiShareStore.loadingOverlay && userService.phonenumber)) return <LoadingIndicator /> // needs refactor the app is re-rendered before the user object is set (the isLoggedIn is called before setter computed method of isLoggedIn )

    const renderStageNav = (): React.ReactNode => {
        const navgtionDestination = Navigator.getNavgtionDestination()
        try {
            switch (navgtionDestination) {
                case Routes.coreStack.updateApp:
                    return <UpdateApp />
                case MainNavs.mainStack:
                    return <MainNavigator />
                case MainNavs.authStack:
                    return <AuthNavigator />
                default:
                    return <AuthNavigator />
            }
        } catch (error) {
            return <AuthNavigator />
        }
    }

    return (
        // theme={theme}
        <NavigationContainer ref={navigationRef}>
            {renderStageNav()}
        </NavigationContainer>

    )
}

export default observer(AppNavigator)

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
    size: "large",
    color: theme.colors.mainColor
}))(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.rems.x15 * 3
}))
