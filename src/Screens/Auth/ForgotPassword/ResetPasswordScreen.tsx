import React, { useState } from "react"
import LottieView from 'lottie-react-native'
import styled from "styled-components/native"
import { TextField } from "react-native-ui-lib"

import { Text, Button as btn } from "react-native-ui-lib"

import i18n from '../../../core/Localisation/i18n'
import { observer } from "mobx-react"
import ErrorHandler from "../../../core/Services/ErrorHandler/ErrorHandler"
import { ErrorMessages } from "../../../core/Services/ErrorHandler/constants"
import { validatePhoneNumber } from "../../../core/Utils/helper"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Auth from "../../../core/Services/Auth/Auth"

const TRANSLATE_KEY = 'auth.reset_passoword'
const LABEL = i18n.t(`${TRANSLATE_KEY}.label`)
const LABEL1 = i18n.t(`${TRANSLATE_KEY}.label1`)
const HEADLINE = i18n.t(`${TRANSLATE_KEY}.headline`)
const BUTTON = i18n.t(`${TRANSLATE_KEY}.button`)

const authService = new Auth()

const ResetPasswordScreen = ({ route }) => {
    const { email, OTPCode } = route?.params
    const [newPassword, setNewPassword] = useState('')
    const [confrimNewPassword, setConfrimNewPassword] = useState('')

    const onPressHandler = async () => {
        if (newPassword?.replace(/\s/g, '').length < 1 || confrimNewPassword?.replace(/\s/g, '').length < 1) {
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.emptyFields)
            return
        }

        if (newPassword !== confrimNewPassword) {
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.passowordMisMatch)
            return
        }

        authService.resetPassowrd(email, OTPCode, newPassword)
    }

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>

            <Container>
                <Text margin-30 marginB-10 text50>{HEADLINE}</Text>
                <TextInput
                    marginL-30

                    placeholder={LABEL}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    validate={['required', (value) => value.length > 6]}
                    validationMessage={[i18n.t('errors.fields_validation.required'), i18n.t('errors.fields_validation.invalid_password')]}
                />

                <TextInput
                    marginL-30

                    placeholder={LABEL1}
                    onChangeText={setConfrimNewPassword}
                    secureTextEntry
                    validate={['required', (value) => value.length > 6]}
                    validationMessage={[i18n.t('errors.fields_validation.required'), i18n.t('errors.fields_validation.invalid_password')]}
                />
                <Button label={BUTTON} onPress={onPressHandler} />
            </Container>
        </KeyboardAwareScrollView>
    )
}

export default observer(ResetPasswordScreen)

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