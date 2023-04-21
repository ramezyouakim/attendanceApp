import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../core/Constants/Theme/ThemeProvider';
import UpdateApp from '../modules/UpdateApp/UpdateApp'
import MainNavigator from './MainNavigator';
import { currentAppVersion } from '../core/Config/Config';
import HomeScreen from '../Screens/Home/HomeScreen';
import { View } from 'react-native';


const AppNavigator = () => {

    const theme = useTheme()

    function getStageNav(): React.ReactNode {
        if (currentAppVersion < '1.0.0') {
            return <UpdateApp />
        }

        // if (true) { //if auth
        //     return <MainNavigator />
        // }

        return <HomeScreen />

        // <LoginScreen/>
    }

    return (
        // theme={theme}
        <NavigationContainer>
            <StatusBar />
            <View style={{ flex: 1 }}>
                {getStageNav()}
            </View>
        </NavigationContainer>
    )
}

export default AppNavigator