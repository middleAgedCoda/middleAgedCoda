import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#0B1220' }}>
        <StatusBar style="light" />
        <Stack screenOptions={{
          headerStyle: { backgroundColor: '#0B1220' },
          headerTintColor: '#EAEAEA',
          contentStyle: { backgroundColor: '#0B1220' },
        }} />
      </View>
    </SafeAreaProvider>
  );
}
