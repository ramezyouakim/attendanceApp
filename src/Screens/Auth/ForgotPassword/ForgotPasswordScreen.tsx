import React, { useEffect, useRef, useState } from "react"
import LottieView from 'lottie-react-native'
import styled from "styled-components/native"
import { TextField } from "react-native-ui-lib"

import Icon from '../../../../assets/animtions/core/comman/forgot-password.json'
import { Text, Button as btn } from "react-native-ui-lib"

import i18n from '../../../core/Localisation/i18n'
import { observer } from "mobx-react"
import ErrorHandler from "../../../core/Services/ErrorHandler/ErrorHandler"
import { ErrorMessages } from "../../../core/Services/ErrorHandler/constants"
import { validatePhoneNumber } from "../../../core/Utils/helper"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Auth from "../../../core/Services/Auth/Auth"

const TRANSLATE_KEY = 'auth.forgot_password'
const LABEL = i18n.t(`${TRANSLATE_KEY}.label`)
const DESCRIPTION = i18n.t(`${TRANSLATE_KEY}.description`)
const HEADLINE = i18n.t(`${TRANSLATE_KEY}.headline`)
const BUTTON = i18n.t(`${TRANSLATE_KEY}.button`)

const authService = new Auth()

const ForgotPasswordScreen = () => {
    const [email, seEmail] = useState('')

    // workaound after expo update
    const lottieRef = useRef<LottieView | null>(null);
    useEffect(() => {
        if (lottieRef.current) {
            setTimeout(() => {
                lottieRef.current?.reset();
                lottieRef.current?.play();
            }, 100);
        }
    }, [lottieRef.current]);

    const onPressHandler = async () => {
        if (email?.replace(/\s/g, '').length < 1) {
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.emptyFields)
            return
        }

        authService.forgotPassword(email?.replace(/\s/g, '').toLowerCase())
    }

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>

            <Container>
                <Image
                    ref={lottieRef}
                    source={Icon}
                    autoPlay
                    loop
                />
                <Text margin-30 marginB-0 text50>{HEADLINE}</Text>
                <Text margin-30 marginB-10 text70>{DESCRIPTION}</Text>
                <TextInput
                    marginL-30

                    placeholder={LABEL}
                    onChangeText={seEmail}
                    keyboardType='email-address'
                    validate={['required', 'email', (value) => value.length > 6]}
                    validationMessage={[i18n.t('errors.fields_validation.required'),  i18n.t('errors.fields_validation.invalid_email')]}
                />
                <Button label={BUTTON} onPress={onPressHandler} />
            </Container>
        </KeyboardAwareScrollView>
    )
}

export default observer(ForgotPasswordScreen)

// export const AddPhoneNumberScreenScreenOptions: StackNavigationOptions = {
//     title: ,
//   }

const Container = styled.View(({ theme }) => ({
    flex: 1,
    flexDirection: 'column',
    justfiyContent: 'center',
    alignContent: 'center',
    paddingVertical: theme.rems.x5,
    backgroundColor: 'white'
}))

const Image = styled(LottieView)(({ theme }) => ({
    width: theme.dimension.window.width * 0.9,
    height: theme.rems.x15 * 3,
    alignSelf: 'center'
}))

const Button = styled(btn).attrs(({ theme }) => ({
    backgroundColor: theme.colors.mainColor,
    enableShadow: true,
    fullWidth: true,
    supportRTL: true,
    labelStyle: {
        fontWeight: 'bold'
    }
}))(({ theme }) => ({
    width: theme.dimension.window.width * 0.9,
    height: 50,
    marginTop: theme.rems.x8,
    borderRadius: theme.rems.x1,
    alignSelf: 'center'
}))

const TextInput = styled(TextField).attrs(({
    floatingPlaceholder: true,
    enableErrors: true,
    validateOnBlur: true,
    maxLength: 30,
    useGestureHandlerInput: true
}))({})