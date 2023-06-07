import React, { useEffect, useRef } from "react"
import LottieView from 'lottie-react-native'
import styled from "styled-components/native"

import Icon from '../../../../assets/animtions/core/homeScreen/camera-permission-image.json'
import { Text, Button as btn } from "react-native-ui-lib"
import { Linking, TouchableOpacity } from "react-native"
import Navigator from '../../../routes/Navigator'
import i18n from '../../../core/Localisation/i18n'
import { observer } from "mobx-react"

const TRANSLATE_KEY = 'camera_permission'
const TITLE = i18n.t(`${TRANSLATE_KEY}.title`)
const DESCRIPTION = i18n.t(`${TRANSLATE_KEY}.description`)
const OKAY_BUTTON = i18n.t(`${TRANSLATE_KEY}.okay_button`)
const CANCEL_BUTTON = i18n.t(`${TRANSLATE_KEY}.cancel_button`)


const CameraPermission = () => {

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

    const onPressHandler = async () => Linking.openSettings();
    const goBack = () => Navigator.goBack()

    return (
        <Container>
            <Image
                ref={lottieRef}
                source={Icon}
                autoPlay
                loop
            />
            <Text margin-30 marginB-10 text50>{TITLE}</Text>
            <Text marginH-30 text70>{DESCRIPTION}</Text>
            <Button label={OKAY_BUTTON} onPress={onPressHandler} />
            <TouchableOpacity onPress={goBack}>
                <Text marginV-20 text70 blue10 center>{CANCEL_BUTTON}</Text>
            </TouchableOpacity>
        </Container>
    )
}

export default observer(CameraPermission)

const Container = styled.View(({ theme }) => ({
    flex: 1,
    flexDirection: 'column',
    justfiyContent: 'center',
    // alignItems: 'center',
    alignContent: 'center',
    paddingVertical: theme.rems.x5,
    backgroundColor: 'white'
}))

const Image = styled(LottieView)(({ theme }) => ({
    width: theme.dimension.window.width * 0.9,
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
