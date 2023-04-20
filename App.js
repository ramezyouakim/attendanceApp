import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StyleSheet, Text, View } from 'react-native';
import { ErrorBoundary } from './src/modules/ErrorBoundary/ErrorBoundary.tsx'

export default function App() {

  return (
    <ErrorBoundary fallback={() => <View><Text>error is working</Text></View>}>
      <StatusBar />
      <SafeAreaProvider>
        <EEEE />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const EEEE = () => {
  throw new Error('Testing error boundary');
    return (
    <Text>dsds</Text>
  )
}
