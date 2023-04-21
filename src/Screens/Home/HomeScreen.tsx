import React from 'react'
import WelcomeTile from './Components/WelcomeTile'
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

const HomeScreen = () => {
    return (
        <Container>
            <WelcomeTile />
        </Container>
    )
}

export default HomeScreen

const Container = styled(ScrollView)(({ theme }) => ({
    flex: 1,
}))