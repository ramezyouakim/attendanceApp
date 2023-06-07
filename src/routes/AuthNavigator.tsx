import * as React from 'react';
import { ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styled from 'styled-components';
import { useState } from 'react';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegistrationScreen from '../Screens/Auth/RegistrationScreen';
import { AuthRoutes } from './Routes';
import AddPhoneNumberScreen from '../Screens/Auth/AddPhoneNumberScreen';
import i18n from '../core/Localisation/i18n';
import ForgotPasswordScreen from '../Screens/Auth/ForgotPassword/ForgotPasswordScreen';
import VerfiyPassowordOTPScreen from '../Screens/Auth/ForgotPassword/VerfiyPassowordOTPScreen';
import ResetPasswordScreen from '../Screens/Auth/ForgotPassword/ResetPasswordScreen'

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
        <AuthStack.Navigator>
            <AuthStack.Group screenOptions={{ header: () => null }}>

                <AuthStack.Screen name={AuthRoutes.login} component={LoginScreen} />
                <AuthStack.Screen name={AuthRoutes.registrationScreen} component={RegistrationScreen} />
            </AuthStack.Group>
            <AuthStack.Screen name={AuthRoutes.addPhoneNumber} component={AddPhoneNumberScreen} options={{ title: i18n.t('auth.add_phone_number.title') }} />
            <AuthStack.Group>
                <AuthStack.Screen name={AuthRoutes.forgotPassword} component={ForgotPasswordScreen} options={{ title: i18n.t('auth.forgot_password.title') }} />
                <AuthStack.Screen name={AuthRoutes.verfiyPasswordOTP} component={VerfiyPassowordOTPScreen} options={{ title: i18n.t('auth.verfiy_passoword_OTP.title') }} />
                <AuthStack.Screen name={AuthRoutes.resetPassword} component={ResetPasswordScreen} options={{ title: i18n.t('auth.reset_passoword.title') }} />
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