import * as React from 'react';
import { ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/HomeScreen'
import styled from 'styled-components/native';
import QRSannerScreen from '../Screens/Score/QRSannerScreen/QRSannerScreen';
import { CoreRoutes, MainNavs, MainRoutes } from './Routes';
import SucessScreen from '../Screens/Score/SucessScreen/SucessScreen';
import UpdateAppScreen from '../modules/UpdateApp/UpdateApp';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutUsScreen from '../Screens/About us/AboutUs';
import Services from '../core/Services/Main'
import { observer } from 'mobx-react';
import i18n from '../core/Localisation/i18n';
import CustomDrawerContent from './CustomDrawer';

const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        Services.initializatServices()
        setLoading(false)
    }, [])

    if (loading) return <LoadingIndicator />

    return (
        <>
            <MainStack.Navigator>
                <MainStack.Group>
                    <MainStack.Screen name={MainNavs.mainStack} component={DrawerNavigator} options={{ header: () => null }} />
                    <MainStack.Screen name={MainRoutes.qrSanner} component={QRSannerScreen} options={{ title: '' }} />

                    <MainStack.Screen name={MainRoutes.sucess} component={SucessScreen} options={{ header: () => null }} />
                    <MainStack.Screen name={CoreRoutes.updateApp} component={UpdateAppScreen} options={{ header: () => null }} />
                </MainStack.Group>
            </MainStack.Navigator>
        </>
    )
}

const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName="Home" drawerContent={() => <CustomDrawerContent />}>
        <Drawer.Screen name={MainRoutes.home} component={HomeScreen} options={{ title: i18n.t('screens_titles.home') }} />
        <Drawer.Screen name={MainRoutes.aboutUs} component={AboutUsScreen} options={{ title: i18n.t('screens_titles.about_us') }} />
    </Drawer.Navigator>
)

export default observer(MainNavigator)

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
    size: "large",
    color: theme.colors.mainColor
}))(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.rems.x15 * 3
}))
