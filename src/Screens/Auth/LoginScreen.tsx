import React, { useState } from "react"
import { Card, TextField, Text } from "react-native-ui-lib"
import styled from "styled-components/native"

import LogoPlaceholder from '../../../assets/Auth/Login/logo-placeholder-image.png';
import ConnectionStatusBar from "../../modules/ConnectionStatusBar/ConnectionStatusBar";
import i18n from "../../core/Localisation/i18n";
import { TouchableOpacity } from "react-native";
import AuthButton from "./Components/AuthButton";
import GoogleAuthButton from "./Components/GoogleAuthButton";
import * as Animatable from 'react-native-animatable';
import { View } from "react-native";
import Auth from "../../core/Services/Auth/Auth";

const TRANSLATION_KEY = 'auth.login'
const EMAIL_TEXT = i18n.t('auth.email')
const PASSWORDL_TEXT = i18n.t('auth.password')
const OR_TEXT = i18n.t('auth.or')
const LOGIN_BUTTON_TEXT = i18n.t(`${TRANSLATION_KEY}.button`)
const GOOGLE_BUTTON_TEXT = i18n.t(`${TRANSLATION_KEY}.google_buton`)
const CREATE_ACCOUNT_BUTTON_TEXT = i18n.t(`${TRANSLATION_KEY}.create_account`)
const HERE_BUTTON_TEXT = i18n.t('auth.here')


const LoginScreen = () => {

    const auth = new Auth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const setInputs = (setter) => (value) => {
        setter(value)
    }

    const login = () => auth.login(email, password)

    return (
        <Container>
            <ImageContainer>
                <Animatable.View animation="fadeInUp">
                    <Image
                        source={LogoPlaceholder}
                    />
                </Animatable.View>

            </ImageContainer>
            <View style={{
                width: '90%'
            }}>
                <Animatable.View delay={300} animation="fadeInUp">
                    <InputsContainer>
                        <TextInput
                            placeholder={EMAIL_TEXT}
                            onChangeText={setInputs(setEmail)}
                            validate={['required', 'email', (value) => value.length > 6]}
                            validationMessage={['Field is required', 'Email is invalid']}

                        />

                        <SeparatorLine />

                        <TextInput
                            placeholder={PASSWORDL_TEXT}
                            onChangeText={setInputs(setPassword)}
                            secureTextEntry
                            validate={['required', (value) => value.length > 6]}
                            validationMessage={['Field is required', 'Password is too short']}
                        />
                    </InputsContainer>
                </Animatable.View>
            </View>

            <ButtonsContainer>
                <Animatable.View delay={600} animation="fadeInUp">
                    <AuthButton label={LOGIN_BUTTON_TEXT} onPressHandler={login} />
                    <Text center margin-15>{OR_TEXT}</Text>
                    <GoogleAuthButton label={GOOGLE_BUTTON_TEXT} />

                    <TouchableOpacity>
                        <Text center margin-20>
                            {CREATE_ACCOUNT_BUTTON_TEXT}
                            <Text blue40> {HERE_BUTTON_TEXT}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </ButtonsContainer>
            <ConnectionStatusBar />
        </Container>
    )
}

export default LoginScreen

const Container = styled.View(({ theme }) => ({
    flex: 1,
    flexDirection: 'column',
    justfiyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: theme.rems.x5,
    backgroundColor: 'white'
}))

const InputsContainer = styled(Card).attrs(({
    containerStyle: {
        flexDirection: 'column'
    },
    enableShadow: true,
    elevation: 5
}))(({ theme }) => ({
    padding: theme.rems.x3,
    backgroundColor: 'white',
    marginBottom: theme.rems.x6
}))

const ImageContainer = styled.View(({ theme }) => ({
    flex: 2,
}))

const Image = styled.Image(({
    width: 200,
    height: 200
}))

const ButtonsContainer = styled.View(({ theme }) => ({
    flex: 2,
}))

const SeparatorLine = styled.View(({ theme }) => ({
    height: 2,
    marginVertical: theme.rems.x1,
    backgroundColor: theme.colors.gray
}))

const TextInput = styled(TextField).attrs(({
    floatingPlaceholder: true,
    enableErrors: true,
    validateOnBlur: true,
    maxLength: 30,
    useGestureHandlerInput: true
}))({})