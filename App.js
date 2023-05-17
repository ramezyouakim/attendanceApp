import * as React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SafeAreaView, I18nManager } from 'react-native';

import { ErrorBoundary } from './src/modules/ErrorBoundary/ErrorBoundary.tsx'
import ManageThemeProvider from './src/core/Constants/Theme/ThemeProvider'
import AppNavigator from './src/routes/AppNavigator'
import styled from 'styled-components/native';
import LoadingOverlay from './src/modules/LoadingOverlay/LoadingOverlay.tsx'
import Common from './src/core/Services/Common/Common';
import { observer } from 'mobx-react';

const commonService = new Common()

function App() {

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    loadLanguage()
  }, [commonService.appLanguage])

  const loadLanguage = async () => {
    setLoading(true)
    await commonService.initialization()
    setLoading(false)
  }

  if (loading) return null

  return (
    <ErrorBoundary>

      <SafeAreaProvider>
        <SafeAreaContainer>
          <ManageThemeProvider>

            <AppNavigator />
            <LoadingOverlay />

          </ManageThemeProvider>
        </SafeAreaContainer>
      </SafeAreaProvider>

    </ErrorBoundary>
  )
}

export default observer(App)

const SafeAreaContainer = styled(SafeAreaView)(({
  flex: 1
}))