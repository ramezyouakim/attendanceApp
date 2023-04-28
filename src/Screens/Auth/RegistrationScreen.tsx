import React, { useState } from "react"
import { Button, Card, TextField, Text } from "react-native-ui-lib"
import styled from "styled-components/native"

import ConnectionStatusBar from "../../modules/ConnectionStatusBar/ConnectionStatusBar";
import i18n from "../../core/Localisation/i18n";
import { ScrollView, TouchableOpacity } from "react-native";
import GoogleAuthButton from "./Components/GoogleAuthButton";
import AuthButton from "./Components/AuthButton";

const TRANSLATION_KEY = 'auth.registration'
const NAME_TEXT = i18n.t('auth.name')
const EMAIL_TEXT = i18n.t('auth.email')
const PHONENUMBER_TEXT = i18n.t('auth.phone_number')
const PASSWORD_TEXT = i18n.t('auth.password')
const OR_TEXT = i18n.t('auth.or')
const LOGIN_BUTTON_TEXT = i18n.t(`${TRANSLATION_KEY}.button`)
const GOOGLE_BUTTON_TEXT = i18n.t(`${TRANSLATION_KEY}.google_buton`)
const ALREADY_HAVE_ACCOUNT_BUTTON_TEXT = i18n.t(`${TRANSLATION_KEY}.already_have_account`)
const HERE_BUTTON_TEXT = i18n.t('auth.here')
const CREATE_ACCOUNT_TITLE = i18n.t(`${TRANSLATION_KEY}.title`)

const RegistrationScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phonenumber, setPhonenumber] = useState('')

    const setInputs = (setter) => (value) => {
        setter(value)
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
            <Container>
                <Text center margin-20 text50>{CREATE_ACCOUNT_TITLE}</Text>
                <InputsContainer>

                    <TextInput
                        placeholder={NAME_TEXT}
                        onChangeText={setInputs(setName)}
                        secureTextEntry
                        validate={['required', (value) => value.length > 6]}
                        validationMessage={['Field is required']}
                    />
                    <SeparatorLine />

                    <TextInput
                        placeholder={EMAIL_TEXT}
                        onChangeText={setInputs(setEmail)}
                        validate={['required', 'email', (value) => value.length > 6]}
                        validationMessage={['Field is required', 'Email is invalid']}

                    />
                    <SeparatorLine />

                    <TextInput
                        placeholder={PHONENUMBER_TEXT}
                        onChangeText={setInputs(setPhonenumber)}
                        secureTextEntry
                        validate={['required', (value) => value.length > 6]}
                        validationMessage={['Field is required', 'Invalid Phone Number']}
                    />
                    <SeparatorLine />

                    <TextInput
                        placeholder={PASSWORD_TEXT}
                        onChangeText={setInputs(setPassword)}
                        secureTextEntry
                        validate={['required', (value) => value.length > 6]}
                        validationMessage={['Field is required', 'Password is too short']}
                    />

                </InputsContainer>

                <ButtonsContainer>
                    <AuthButton label={LOGIN_BUTTON_TEXT} onPressHandler={() => { }} />
                    <Text center margin-15>{OR_TEXT}</Text>
                    <GoogleAuthButton label={GOOGLE_BUTTON_TEXT} />

                    <TouchableOpacity>
                        <Text center margin-20>
                            {ALREADY_HAVE_ACCOUNT_BUTTON_TEXT}
                            <Text blue40> {HERE_BUTTON_TEXT}</Text>
                        </Text>
                    </TouchableOpacity>
                </ButtonsContainer>
                <ConnectionStatusBar />
            </Container>
        </ScrollView>
    )
}

export default RegistrationScreen

const Container = styled.View(({ theme }) => ({
    flex: 1,
    flexDirection: 'column',
    justfiyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: theme.rems.x5,
}))

const InputsContainer = styled(Card).attrs(({
    containerStyle: {
        flexDirection: 'column'
    },
    enableShadow: true,
    elevation: 5
}))(({ theme }) => ({
    padding: theme.rems.x3,
    width: '90%',
    backgroundColor: 'white',
    marginBottom: theme.rems.x6
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
}))({
    lineHeight: '20px'
})