import React, { useEffect, useRef, useState } from 'react'
import WelcomeTile from './Components/WelcomeTile'
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import SmallTile from './Components/SmallTile';
import LottieView from "lottie-react-native";

import ScanQrTileIcon from '../../../assets/animtions/core/homeScreen/scan-qr-tile-icon.json'
import RedemGiftsIcon from '../../../assets/animtions/core/homeScreen/redem-gift-tile-icon.json'

import i18n from '../../core/Localisation/i18n';
import ConnectionStatusBar from '../../modules/ConnectionStatusBar/ConnectionStatusBar';
import { Routes } from '../../routes/Routes';
import Navigator from '../../routes/Navigator'
import celebration from '../../../assets/animtions/core/homeScreen/home-celebrate.json'
import UserScore from '../../core/Services/UserScore/UserScore';
import { observer } from 'mobx-react';


const SCAN_TILE_TITLE = i18n.t("home.scan_tile.title")
const REDEM_TILE_TITLE = i18n.t("home.redem_tile.title")

const userScoreService = new UserScore()

const HomeScreen = () => {

    const lottieRef = useRef<LottieView | null>(null);

    useEffect(() => {
        let timer
        if (userScoreService.showCelebration) {
            lottieRef.current?.play();
            timer = setTimeout(() => {
                userScoreService.setShowCelebration(false)
            }, 3700);
        }
        return () => {
            timer && clearTimeout(timer);
        };
    }, [userScoreService.showCelebration])

    const onScanTilePress = () => Navigator.navigateTo(Routes.mainStack.qrSanner)
    const onRedemeGiftsTilePress = () => { }

    return (
        <>
            <Container>
                <WelcomeTile />
                <Row>
                    <SmallTile image={ScanQrTileIcon} title={SCAN_TILE_TITLE} onPressHandler={onScanTilePress} />
                    <SmallTile image={RedemGiftsIcon} title={REDEM_TILE_TITLE} onPressHandler={onRedemeGiftsTilePress} disabled />
                </Row>


            </Container>
            
            {userScoreService.showCelebration &&
                <ImageContainer>
                    <Image
                        ref={lottieRef}
                        source={celebration}
                    />

                </ImageContainer>
            }
            <ConnectionStatusBar />
        </>
    )
}

export default observer(HomeScreen)

const Container = styled(ScrollView)(({
    flex: 1,
}))

const Row = styled.View(({ theme }) => ({
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: theme.rems.x1
}))

const ImageContainer = styled.View({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
})

const Image = styled(LottieView)(({ theme }) => ({
    width: theme.dimension.window.width,
    flex: 1,
    alignSelf: 'center'
}))