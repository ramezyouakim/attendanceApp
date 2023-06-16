import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native'
import { Card, Text } from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';

import WelcomeTileImage from '../../../../assets/animtions/core/homeScreen/welcome-tile-image.json'
import styled from 'styled-components/native';
import i18n from '../../../core/Localisation/i18n';
import { observer } from 'mobx-react';
import User from '../../../core/Services/User/User';

const TRANSLATION_KEY = 'home.welcome_tile'

const user = new User()

const WelcomeTile = () => {

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

    return (
        <Animatable.View animation="zoomInUp">
            <CardConatiner>
                <ContentContainer>
                    <WelcomeTitle>{i18n.t(`${TRANSLATION_KEY}.title`, { name: user.fullname.split(' ')[0] || '' })}</WelcomeTitle>
                    {/*
                        to be added 
                        <Badge label={'Most Famous'} size={17} />
                        <Badge label={'New Member'} size={17} />
                     */}

                    <ScoreTitle>{i18n.t(`${TRANSLATION_KEY}.score_title`)}</ScoreTitle>
                    <ScoreCountContainer>
                        <ScoreCount>{user.score.total_score || 0}</ScoreCount>
                        <ScoreCountPrefix> {i18n.t(`${TRANSLATION_KEY}.score_count_prefix`)}</ScoreCountPrefix>
                    </ScoreCountContainer>
                </ContentContainer>

                <ImageContainer>
                    <Image
                        ref={lottieRef}
                        source={WelcomeTileImage}
                    />
                </ImageContainer>
            </CardConatiner>
        </Animatable.View>
    )
}

export default observer(WelcomeTile)

const CardConatiner = styled(Card).attrs(({
    containerStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    "margin-15": true,
    enableShadow: true,
    elevation: 5
}))(({
    backgroundColor: 'white'
}))

const ContentContainer = styled.View(({
    flex: 1
}))

const ImageContainer = styled.View(({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
}))

const Image = styled(LottieView)(({
    width: 150
}))

const WelcomeTitle = styled(Text).attrs({
    text60: true
})(({ theme }) => ({
    marginVertical: theme.rems.x4,
    marginLeft: theme.rems.x4
}))

const ScoreTitle = styled(Text).attrs({
    text70: true,
})(({ theme }) => ({
    marginLeft: theme.rems.x4,
}))

const ScoreCount = styled.Text(({ theme }) => ({
    marginLeft: theme.rems.x4,
    fontSize: theme.fonts.header4
}))

const ScoreCountContainer = styled.View(({
    flexDirection: 'row',
    alignItems: 'flex-end'
}))

const ScoreCountPrefix = styled.Text(({ theme }) => ({
    paddingBottom: theme.rems.x1
}))