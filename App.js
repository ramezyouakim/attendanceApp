import * as React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View, SafeAreaView } from 'react-native';
import { ConnectionStatusBar } from 'react-native-ui-lib';
import { ErrorBoundary } from './src/modules/ErrorBoundary/ErrorBoundary.tsx'
import i18n from './src/core/Localisation/i18n';
import ManageThemeProvider from './src/core/Constants/Theme/ThemeProvider'
import AppNavigator from './src/routes/AppNavigator'
import styled from 'styled-components/native';


const CONNECTION_STATUS_BAR_LABEL = i18n.t("internet_connectivity_label")

export default function App() {

  return (
    <ErrorBoundary fallback={() => <View><Text>error is working</Text></View>}>

      <SafeAreaProvider>
        <SafeAreaContainer>
          <ManageThemeProvider>
            <ConnectionStatusBar
              onConnectionChange={() => console.log('connection changed')}
              label={CONNECTION_STATUS_BAR_LABEL}
            />

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