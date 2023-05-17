import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react"
import { ActivityIndicator, Button, StyleSheet, Vibration } from "react-native";
import styled from "styled-components/native";
import { Text } from 'react-native-ui-lib';
import Navigator from '../../../routes/Navigator'

import QrCodeScanner from '../../../../assets/score/qrScanner/qr-scanner-icon.png'
import { Routes } from "../../../routes/Routes";
import i18n from '../../../core/Localisation/i18n'
import * as Animatable from 'react-native-animatable';
import CameraPermission from "./CameraPermission";
import Common from "../../../core/Services/Common/Common";
import UserScore from "../../../core/Services/UserScore/UserScore";

const DESCRIPTION_TITLE = i18n.t('qr_code_scanner.description_title')
const DESCRIPTION_BODY = i18n.t('qr_code_scanner.description_body')
const SCAN_RETRY = i18n.t('qr_code_scanner.scan_retry')

const commonService = new Common()
const userScoreService = new UserScore()

const QRSannerScreen = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        requestCameraPermission()
    }, []);

    const requestCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(Boolean(status === 'granted'));
        })();
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        try {
            Vibration.vibrate(1000)
            commonService.setLoadingOverlay(true)
            setScanned(true);
            const results = await userScoreService.scanQrCode(data)
            if (results) {
                setScanned(false);
                userScoreService.updateScore(results.score)
                Navigator.reset({ routeName: Routes.mainStack.sucess, position: 2 })
                userScoreService.setShowCelebration(true)
            }
            commonService.setLoadingOverlay(false)

        } catch (error) {
            console.log("handleBarCodeScanned ", error)
            setScanned(false);
            commonService.setLoadingOverlay(false)
        } 
    }

    if (hasPermission === null) {
        return <LoadingIndicator />
    }
    if (hasPermission === false) {
        return <CameraPermission />
    }

    return (
        <>
            <Container>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                <Image animation="pulse" easing="ease-out" iterationCount={'infinite'} source={QrCodeScanner} />
                {scanned && <Button title={SCAN_RETRY} onPress={() => setScanned(false)} />}
            </Container>
            <TextOverlyContainer>
                <TextOverly>
                    <Description center style={{ fontSize: 20 }}>{DESCRIPTION_TITLE}</Description>
                    <Description marginT-20 center>{DESCRIPTION_BODY}</Description>
                </TextOverly>
            </TextOverlyContainer>
        </>
    )
}

export default QRSannerScreen

const Container = styled.View(({
    flex: 1,
    justifyContent: 'center',
}))

const TextOverlyContainer = styled.View(({
    position: 'absolute',
    left: 0,
    right: 0
}))

const TextOverly = styled.View(({ theme }) => ({
    borderRadius: 15,
    margin: theme.rems.x7,
    marginTop: theme.rems.x3,
    padding: theme.rems.x5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center'
}))

const Image = styled(Animatable.Image)({
    width: 320,
    height: 320,
    alignSelf: 'center',
    padding: 100
})

const Description = styled(Text)(({
    color: 'white',
    fontWeight: '500'
}))

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
    size: "large",
    color: theme.colors.mainColor
}))(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.rems.x15 * 3
}))
