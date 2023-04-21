import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import update_app_image from '../../../assets/animtions/core/updateApp/update-app.json'
import styled from 'styled-components/native'
import AnimatedLottieView from 'lottie-react-native'
import { Text, View, Button } from 'react-native-ui-lib';
import i18n from '../../core/Localisation/i18n'

const APP_UPDATE_TITLE = i18n.t("app_update.title")
const APP_UPDATE_BUTTON = i18n.t("app_update.button")

const UpdateApp = () => {
    // workaound after expo update
    const lottieRef = useRef<AnimatedLottieView | null>(null);
    useEffect(() => {
        if (lottieRef.current) {
            setTimeout(() => {
                lottieRef.current?.reset();
                lottieRef.current?.play();
            }, 100);
        }
    }, [lottieRef.current]);

    const onPressHandler = () => {
        //  create remote config
    }

    return (
        <Container>
            <Header>{APP_UPDATE_TITLE}</Header>
            <Image
                style={{ width: '100%' }}
                ref={lottieRef}
                source={update_app_image}
                autoPlay
                loop
            />
            <UpdateButton label={APP_UPDATE_BUTTON} onPress={onPressHandler} />
        </Container>
    )
}

const Container = styled(View)(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center'
}))

const Header = styled(Text)(({ theme }) => ({
    fontSize: theme.fonts.header2,
    textAlign: 'center',
    marginTop: theme.rems.x8,
    marginBottom: theme.rems.x4,
    color: theme.colors.mainTextColor,
    fontWeight: '500'
}))

const Image = styled(LottieView)(({ theme }) => ({
    width: theme.dimension.window.width
}))

const UpdateButton = styled(Button).attrs(({ theme }) => ({
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
    borderRadius: theme.rems.x1
}))

export default UpdateApp