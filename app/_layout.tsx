import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { SignInContextProvider } from '@/contexts/sign-in-context/sign-in-context-provider';
import { SignUpContextProvider } from '@/contexts/sign-up-context/sign-up-context-provider';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SignUpContextProvider>
        <SignInContextProvider>
          <Stack screenOptions={{
            headerShown: false,
            animation: "fade"
          }}>
          </Stack>
        </SignInContextProvider>
      </SignUpContextProvider>
    </ThemeProvider>
  );
}
