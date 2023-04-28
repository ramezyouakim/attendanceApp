import React from 'react'
import { Button as btn } from 'react-native-ui-lib'
import styled from 'styled-components/native'

type AuthButtonProps = {
    label: string
    onPressHandler: () => void
}

const AuthButton = ({ label, onPressHandler }: AuthButtonProps) => {
    return (
        <Button label={label} onPress={onPressHandler} />
    )
}

export default AuthButton

export const Button = styled(btn).attrs(({ theme }) => ({
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
    borderRadius: theme.rems.x1
}))