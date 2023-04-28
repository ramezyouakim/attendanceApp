import * as React from 'react';
import { ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styled from 'styled-components';
import { useState } from 'react';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegistrationScreen from '../Screens/Auth/RegistrationScreen';
import { AuthRoutes } from './Routes';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {

    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    if (loading) return <LoadingIndicator />

    return (
        <AuthStack.Navigator  screenOptions={{ header: () => null }} >
            <AuthStack.Group>
                <AuthStack.Screen name={AuthRoutes.login} component={LoginScreen}/>
                <AuthStack.Screen name={AuthRoutes.registrationScreen} component={RegistrationScreen}/>
            </AuthStack.Group>
        </AuthStack.Navigator>
    )
}

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
    size: "large",
    color: theme.colors.mainColor
}))(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.rems.x15 * 3
}))

export default AuthNavigator