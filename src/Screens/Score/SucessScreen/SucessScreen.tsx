import React, { useEffect, useRef } from "react"
import styled from "styled-components/native"
import { Text, Button as btn } from 'react-native-ui-lib'
import Navigator from '../../../routes/Navigator'

import celebration from '../../../../assets/animtions/core/comman/party-celebration.json'
import trpohy from '../../../../assets/animtions/core/comman/trophy.json'

import LottieView from "lottie-react-native";
import i18n from "../../../core/Localisation/i18n"
import { observer } from "mobx-react"

const TRANSLATE_KEY = 'success_screen'
const DESCRIPTION = i18n.t(`${TRANSLATE_KEY}.description`)
const BUTTON = i18n.t(`${TRANSLATE_KEY}.button`)

const SucessScreen = ({ route }) => {
    const { increaseBy } = route?.params

    const onPressHandler = () => Navigator.showMain()

    const lottieRef = useRef<LottieView | null>(null);
    const lottieRef2 = useRef<LottieView | null>(null);

    useEffect(() => {
        if (lottieRef.current || lottieRef2.current) {
            setTimeout(() => {
                lottieRef.current?.reset();
                lottieRef.current?.play();

                lottieRef2.current?.reset();
                lottieRef2.current?.play();
            }, 100);
        }
    }, [lottieRef.current, lottieRef2.current]);

    return (
        <>
            <Container>
                <Text center margin-20 text10>{i18n.t(`${TRANSLATE_KEY}.title`, { points: increaseBy || '' })}</Text>
                <Image
                    ref={lottieRef}
                    source={trpohy}
                />
                <Text center margin-20 text50>{DESCRIPTION}</Text>

            </Container>
            <Overlay>
                <Image
                    ref={lottieRef2}
                    source={celebration}
                />
            </Overlay>
            <Button label={BUTTON} onPress={onPressHandler} />
        </>
    )
}

export default observer(SucessScreen)

const Container = styled.View(({
    flex: 1
}))

const Overlay = styled.View(({
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}))

const Image = styled(LottieView)(({ theme }) => ({

    width: theme.dimension.window.width,
    flex: 1,
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
