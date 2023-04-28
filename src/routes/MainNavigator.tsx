import * as React from 'react';
import { ActivityIndicator, Alert, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/HomeScreen'
import styled from 'styled-components/native';
import { useState } from 'react';
import QRSannerScreen from '../Screens/Score/QRSannerScreen/QRSannerScreen';
import { CoreRoutes, MainRoutes } from './Routes';
import SucessScreen from '../Screens/Score/SucessScreen/SucessScreen';
import UpdateAppScreen from '../modules/UpdateApp/UpdateApp';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutUsScreen from '../Screens/About us/AboutUs';

const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainNavigator = () => {

    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    if (loading) return <LoadingIndicator />

    return (<>

        <MainStack.Navigator>
            <MainStack.Group>
                <MainStack.Screen name={MainRoutes.home} component={DrawerNavigator} options={{ header: () => null }} />
                <MainStack.Screen name={MainRoutes.qrSanner} component={QRSannerScreen} options={{ title: '' }} />

                <MainStack.Screen name={MainRoutes.sucess} component={SucessScreen} options={{ header: () => null }} />
                <MainStack.Screen name={CoreRoutes.updateApp} component={UpdateAppScreen} options={{ header: () => null }} />
            </MainStack.Group>
        </MainStack.Navigator>
    </>
    )
}

const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About Us" component={AboutUsScreen} />
        {/* <Drawer.Screen name="Logout" component={()=>Alert.alert('dsds')} /> */}
    </Drawer.Navigator>
)

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
    size: "large",
    color: theme.colors.mainColor
}))(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.rems.x15 * 3
}))

export default MainNavigator