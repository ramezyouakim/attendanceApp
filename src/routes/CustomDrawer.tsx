import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import styled from 'styled-components/native';
import i18n from '../core/Localisation/i18n';
import Navigator from '../routes/Navigator'
import { MainRoutes } from './Routes';
import Auth from '../core/Services/Auth/Auth';
import { APPLanguages } from '../core/Services/Common/types';
import Common from '../core/Services/Common/Common';

function CustomDrawerContent() {
    const authService = new Auth()
    const commonService = new Common()

    const showActionSheet = () => {
        this.ActionSheet.show()
    }

    const lang = {
        'en': i18n.t('app_langs.langs')[0],
        'ar': i18n.t('app_langs.langs')[1]
    }

    const changeAppLangHandlder = (index) => {
        let language = APPLanguages.english

        if (index === 0) {
            language = APPLanguages.english
        }

        if (index === 1) {
            language = APPLanguages.arabic
        }

        commonService.changeAppLanguage(language)
    }

    const DrawerList = [
        {
            title: i18n.t('screens_titles.home'),
            routeName: MainRoutes.home,
            onPressHandler: () => Navigator.reset({ routeName: MainRoutes.home, position: 0 })
        },
        {
            title: i18n.t('screens_titles.about_us'),
            routeName: MainRoutes.aboutUs,
            onPressHandler: () => Navigator.reset({ routeName: MainRoutes.aboutUs, position: 0 })
        },
        {
            title: i18n.t('screens_titles.lang_settings', { appLang: lang[commonService.appLangLocale] }),
            routeName: MainRoutes.aboutUs,
            onPressHandler: () => showActionSheet()
        },
        {
            title: i18n.t('screens_titles.logout'),
            onPressHandler: () => authService.logout()
        }
    ]

    return (
        <Container>
            {DrawerList.map(item => <DrawerItem {...item} key={item.title} />)}
            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={i18n.t('app_langs.title')}
                options={i18n.t('app_langs.langs')}
                cancelButtonIndex={2}
                onPress={changeAppLangHandlder}
            />
        </Container>
    );
}

export default CustomDrawerContent;

const DrawerItem = ({ title, onPressHandler }) => {
    return (
        <Item onPress={onPressHandler}>
            <ItemText style={{ fontSize: 16 }}>{title}</ItemText>
        </Item>
    )
}

const Container = styled.View(({ theme }) => ({
    paddingVertical: theme.rems.x7,
    flex: 1,
    backgroundColor: '#fff'
}))

const Item = styled(TouchableOpacity)(({ theme }) => ({
    marginHorizontal: theme.rems.x3,
    marginVertical: theme.rems.x2 * 0.7,
    backgroundColor: "#E2EFFF",
    borderRadius: 5
}))

const ItemText = styled(Text)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.rems.x2,
    color: '#397ecf',
    fontWeight: '600'
}))