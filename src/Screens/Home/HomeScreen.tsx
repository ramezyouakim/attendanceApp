import React from 'react'
import WelcomeTile from './Components/WelcomeTile'
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import SmallTile from './Components/SmallTile';

import ScanQrTileIcon from '../../../assets/animtions/core/homeScreen/scan-qr-tile-icon.json'
import RedemGiftsIcon from '../../../assets/animtions/core/homeScreen/redem-gift-tile-icon.json'

import i18n from '../../core/Localisation/i18n';

const SCAN_TILE_TITLE = i18n.t("home.scan_tile.title")
const REDEM_TILE_TITLE = i18n.t("home.redem_tile.title")

const HomeScreen = () => {

    const onScanTilePress = () => { }
    const onRedemeGiftsTilePress = () => { }


    return (
        <Container>
            <WelcomeTile />
            <Row>
                <SmallTile image={ScanQrTileIcon} title={SCAN_TILE_TITLE} onPressHandler={onScanTilePress} />
                <SmallTile image={RedemGiftsIcon} title={REDEM_TILE_TITLE} onPressHandler={onRedemeGiftsTilePress} disabled />
            </Row>
        </Container>
    )
}

export default HomeScreen

const Container = styled(ScrollView)(({
    flex: 1,
}))

const Row = styled.View(({ theme }) => ({
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: theme.rems.x1
}))