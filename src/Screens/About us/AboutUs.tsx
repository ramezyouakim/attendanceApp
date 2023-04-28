import React, { useCallback, useRef } from 'react'
import { ScrollView } from 'react-native';
import { showLocation } from 'react-native-map-link';

import styled from 'styled-components/native';

import i18n from '../../core/Localisation/i18n';
import ConnectionStatusBar from '../../modules/ConnectionStatusBar/ConnectionStatusBar';
import { Card, Text } from 'react-native-ui-lib';

import MapSnapShot from '../../../assets/AboutUs/mapSnapShot.png'
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';

const TRANSLATION_KEY = 'about_us'
const TITLE = i18n.t(`${TRANSLATION_KEY}.title`)
const DESCRIPTION = i18n.t(`${TRANSLATION_KEY}.description`)
const DIALOG_TITLE = i18n.t(`${TRANSLATION_KEY}.dialog_title`)
const DIALOG_MESSAGE = i18n.t(`${TRANSLATION_KEY}.dialog_message`)
const DIALOG_BUTTON = i18n.t(`${TRANSLATION_KEY}.dialog_button`)

const AboutUsScreen = () => {

    const animRef = useRef()

    useFocusEffect(useCallback(()=>{
        animRef?.current?.fadeInUp()
    },[]))

    const openMap = () => {
        showLocation({
            latitude:  30.0799429,
            longitude: 31.2823201,
            title: 'كنيسة مقر دير الأنبا بولا - حدائق القبة', // optional
            googleForceLatLon: true, // optionally force GoogleMaps to use the latlon for the query instead of the title
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: DIALOG_TITLE, // optional (default: 'Open in Maps')
            dialogMessage: DIALOG_MESSAGE, // optional (default: 'What app would you like to use?')
            cancelText: DIALOG_BUTTON, // optional (default: 'Cancel')
            appsWhiteList: ['google-maps', 'apple-maps', 'uber'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // naverCallerName: 'com.example.myapp', // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
        });
    }
    return (
        <>
            <Container>
                <Animatable.View ref={animRef}>
                <Text text50 marginB-10>{TITLE}</Text>
                <Text text70 marginB-50>{DESCRIPTION}</Text>

                <Card onPress={openMap} enableShadow>
                    <Image source={MapSnapShot} />
                </Card>
                </Animatable.View>
            </Container>
            <ConnectionStatusBar />
        </>
    )
}

export default AboutUsScreen

const Container = styled(ScrollView)(({ theme }) => ({
    flex: 1,
    padding: theme.rems.x4,
    backgroundColor: ' white'
}))

const Image = styled(Card.Image)(({ theme }) => ({
    width: theme.dimension.window.width * 0.90,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center'
}))