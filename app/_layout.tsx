import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { GetProductsProvider } from '@/contexts/get-products-context/get-products-context-provider';
import { SignInContextProvider } from '@/contexts/sign-in-context/sign-in-context-provider';
import { SignUpContextProvider } from '@/contexts/sign-up-context/sign-up-context-provider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <SignUpContextProvider>
          <SignInContextProvider>
            <GetProductsProvider>
              <Stack screenOptions={{
                headerShown: false,
                animation: "fade"
              }}>
              </Stack>
            </GetProductsProvider>
          </SignInContextProvider>
        </SignUpContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
