import * as React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SafeAreaView, I18nManager } from 'react-native';

import { ErrorBoundary } from './src/modules/ErrorBoundary/ErrorBoundary.tsx'
import ManageThemeProvider from './src/core/Constants/Theme/ThemeProvider'
import AppNavigator from './src/routes/AppNavigator'
import styled from 'styled-components/native';

import i18n from './src/core/Localisation/i18n.ts'

export default function App() {
  const currentLang = i18n.locale

  const [appLang, setAppLang] = React.useState()

  React.useEffect(() => {
    if (currentLang == 'ar' || currentLang == 'ar-US') {
      // if (I18nManager.isRTL) {
        I18nManager.forceRTL(true);
      // }
    } else {
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(false);
      }
    }
    //app will restart
  }, [])

  const languageRestart = async () => {
    //changing language based on what was chosen

  }

  return (
    <ErrorBoundary>

      <SafeAreaProvider>
        <SafeAreaContainer>
          <ManageThemeProvider>

            <AppNavigator />

          </ManageThemeProvider>

        </SafeAreaContainer>
      </SafeAreaProvider>

    </ErrorBoundary>
  )
}

const SafeAreaContainer = styled(SafeAreaView)(({
  flex: 1
}))