import React, { useEffect, useRef } from 'react'
import { Card } from 'react-native-ui-lib'

import styled from 'styled-components/native'
import LottieView, { AnimationObject } from 'lottie-react-native'
import * as Animatable from 'react-native-animatable';
import i18n from '../../../core/Localisation/i18n'


type SmallTileProps = {
    image: string | AnimationObject | { uri: string };
    onPressHandler: () => void
    title: string
    disabled?: boolean
}

const SmallTile = ({ image, onPressHandler, title, disabled = false }: SmallTileProps) => {

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
        <Animatable.View delay={300} animation="zoomIn">
            <CardConatiner onPress={!disabled && onPressHandler}>
                <Image
                    ref={lottieRef}
                    source={image}
                />

                <Title>{title}</Title>
                {disabled &&
                    <Disabled>
                        <ComingSoonText>{i18n.t("home.coming_soon")}</ComingSoonText>
                    </Disabled>
                }
            </CardConatiner>
        </Animatable.View>

    )
    
}

export default SmallTile

const CardConatiner = styled(Card).attrs(({
    containerStyle: {
        flexDirection: 'column'
    },
    "margin-10": true,
    enableShadow: true,
    elevation: 5
}))(({
    backgroundColor: 'white'
}))

const Image = styled(LottieView)(({ theme }) => ({
    width: theme.dimension.window.width / 2.3,
    alignSelf: 'center'
}))

const Title = styled.Text(({ theme }) => ({
    textAlign: 'left',
    paddingLeft: theme.rems.x3,
    paddingBottom: theme.rems.x3,
    fontSize: theme.rems.x3,
    fontWeight: '500'
}))

const Disabled = styled.View(({
    backgroundColor: 'rgba(1, 1, 1, 0.8)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
}))

const ComingSoonText = styled.Text(({ theme }) => ({
    textAlign: 'center',
    fontSize: theme.rems.x3,
    color: 'white'
}))