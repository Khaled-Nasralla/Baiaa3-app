import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { SignInContextProvider } from '@/contexts/signInContext/sign-in-context-provider';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SignInContextProvider>
      <Stack screenOptions={{
        headerShown:false,
        animation:"fade"
       }}

      >

      </Stack>
      </SignInContextProvider>

    </ThemeProvider>
  );
}
