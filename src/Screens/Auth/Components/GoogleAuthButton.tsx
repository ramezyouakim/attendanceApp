import styled from "styled-components/native"
import { Button as btn } from "react-native-ui-lib"
import React from "react"
import GoogleIcon from '../../../../assets/Auth/google-icon.png'
import { Image } from 'react-native'
import { observer } from "mobx-react"
import Auth from "../../../core/Services/Auth/Auth"

type GoogleAuthButtonProps = {
    label: string
}

const authService = new Auth()

const GoogleAuthButton = ({ label }: GoogleAuthButtonProps) => {
    return (
        <Button label={label} onPress={authService.googleAuth} />
    )
}

export default observer(GoogleAuthButton)

export const Button = styled(btn).attrs(({ theme }) => ({
    backgroundColor: theme.colors.gray,
    enableShadow: true,
    fullWidth: true,
    supportRTL: true,
    iconOnRight: false,
    labelStyle: {
        fontWeight: '500',
        color: theme.colors.mainTextColor

    },
    iconSource: () => (
        <Image
            style={{
                width: 30,
                height: 30,
                marginRight: theme.rems.x2
            }}
            source={GoogleIcon}
        />
    )
}))(({ theme }) => ({
    width: theme.dimension.window.width * 0.9,
    height: 50,
    borderRadius: theme.rems.x1
}))