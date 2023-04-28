import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Navigator from './Navigator';
import { Routes } from './Routes';
import UpdateApp from '../modules/UpdateApp/UpdateApp';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const AppNavigator = () => {
    const navigationRef = useNavigationContainerRef()


    React.useEffect(() => {
        onRefChange(navigationRef)
    }, [navigationRef])

    const onRefChange = (ref) => {
        if (ref) {
            Navigator.setNavigtor = ref
        }
    }

    const renderStageNav = (): React.ReactNode => {
        const navgtionDestination = Navigator.getNavgtionDestination()
        try {
            switch (navgtionDestination) {
                case Routes.coreStack.updateApp:
                    return <UpdateApp />
                case Routes.mainStack:
                    return <MainNavigator />
                case Routes.authStack:
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
            <StatusBar />
            {renderStageNav()}
        </NavigationContainer>

    )
}

export default AppNavigator