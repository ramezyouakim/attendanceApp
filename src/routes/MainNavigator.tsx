import * as React from 'react';
import { ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/HomeScreen'
import styled from 'styled-components';
import { useState } from 'react';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {

    const [loading, setLoading] = useState(true)

    React.useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[])

    if (loading) return <LoadingIndicator />

    return (
        <MainStack.Navigator>
            <MainStack.Group>
                <MainStack.Screen name="Home" component={HomeScreen} />
            </MainStack.Group>
        </MainStack.Navigator>
    )
}

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
    size: "large",
    color: theme.colors.mainColor
}))(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.rems.x15 * 3
}))

export default MainNavigator