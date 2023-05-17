import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import styled from 'styled-components/native'
import { Text, View, Button } from 'react-native-ui-lib';
import i18n from '../../core/Localisation/i18n'

import Icon from '../../../assets/animtions/core/comman/404-icon.json'
import { useTheme } from '../../core/Constants/Theme/ThemeProvider';
import Common from '../../core/Services/Common/Common';

const TITLE_TEXT = i18n.t("error_boundry_fallback.title")
const BUTTON_TEXt = i18n.t("error_boundry_fallback.button")

const FallbackScreen = () => {

    const commonService = new Common()
    const theme = useTheme()

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

    const onPressHandler = () => { commonService.restartApp() }

    return (
        <Container>
            <Header theme={theme}>{TITLE_TEXT}</Header>
            <Image
                theme={theme}
                ref={lottieRef}
                source={Icon}
                autoPlay
                loop
            />
            <GoHomeButton theme={theme} label={BUTTON_TEXt} onPress={onPressHandler} />
        </Container>
    )
}

const Container = styled(View)(({
    justifyContent: 'center',
    alignItems: 'center'
}))

const Header = styled(Text)(({ theme }) => ({
    fontSize: theme.fonts.header2,
    textAlign: 'center',
    marginTop: theme.rems.x14,
    marginBottom: theme.rems.x4,
    color: theme.colors.mainTextColor,
    fontWeight: '500'
}))

const Image = styled(LottieView)(({ theme }) => ({
    width: theme.dimension.window.width
}))

const GoHomeButton = styled(Button).attrs(({ theme }) => ({
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

export default FallbackScreen