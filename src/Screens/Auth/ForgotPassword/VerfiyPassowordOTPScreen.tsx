import React, { useEffect, useRef, useState } from "react"
import LottieView from 'lottie-react-native'
import styled from "styled-components/native"
import { TextField } from "react-native-ui-lib"

import Icon from '../../../../assets/animtions/core/comman/otp-forgot-password.json'
import { Text, Button as btn } from "react-native-ui-lib"

import i18n from '../../../core/Localisation/i18n'
import { observer } from "mobx-react"
import ErrorHandler from "../../../core/Services/ErrorHandler/ErrorHandler"
import { ErrorMessages } from "../../../core/Services/ErrorHandler/constants"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Auth from "../../../core/Services/Auth/Auth"
import { TouchableOpacity } from "react-native"

const TRANSLATE_KEY = 'auth.verfiy_passoword_OTP'
const LABEL = i18n.t(`${TRANSLATE_KEY}.label`)
const HEADLINE = i18n.t(`${TRANSLATE_KEY}.headline`)
const BUTTON = i18n.t(`${TRANSLATE_KEY}.button`)
const RESEND = i18n.t(`${TRANSLATE_KEY}.resendCode`)

const authService = new Auth()

const VerfiyPassowordOTPScreen = ({ route }) => {
    const email = route?.params?.email || ''
    const [OTPCode, setOTPCode] = useState('')
    const [timer, setTimer] = useState(60);
    let interval;

    const startTimer = () => {
        interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);
    };

    useEffect(() => {
        // Start the timer when the component mounts
        startTimer();

        // Cleanup interval and event listener when component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

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
        if (OTPCode?.replace(/\s/g, '').length < 1) {
            ErrorHandler.showErrorMessage(ErrorMessages.default.title, ErrorMessages.emptyFields)
            return
        }

        authService.verfiyPasswordOTP(email, OTPCode)
    }

    const resendOTPCode = () => { setTimer(60); startTimer(); authService.forgotPassword(email) }

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
                <Text margin-30 marginB-10 text70>{i18n.t(`${TRANSLATE_KEY}.description`, { email: email })}</Text>
                <TouchableOpacity disabled={timer !== 0} onPress={resendOTPCode}><Text marginL-30 style={{ color: timer !== 0 ? 'gray' : 'blue' }}>{RESEND} {timer !== 0 && formatTime(timer)}</Text></TouchableOpacity>
                <TextInput
                    marginL-30

                    placeholder={LABEL}
                    onChangeText={(value) => setOTPCode(value)}
                    keyboardType='email-address'
                    validate={['required']}
                    validationMessage={[i18n.t('errors.fields_validation.required'), i18n.t('errors.fields_validation.invalid_code')]}
                />
                <Button label={BUTTON} onPress={onPressHandler} />
            </Container>
        </KeyboardAwareScrollView>
    )
}

export default observer(VerfiyPassowordOTPScreen)

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
    maxLength: 6,
    useGestureHandlerInput: true
}))({})