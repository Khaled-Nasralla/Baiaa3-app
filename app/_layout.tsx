import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { GetProductsProvider } from '@/contexts/get-products-context/get-products-context-provider';
import { PagesContextProvider } from '@/contexts/pages-context/pages-context-provider';
import { SignInContextProvider } from '@/contexts/sign-in-context/sign-in-context-provider';
import { SignUpContextProvider } from '@/contexts/sign-up-context/sign-up-context-provider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <SignUpContextProvider>
            <SignInContextProvider>
              <PagesContextProvider> 
              <GetProductsProvider>
                <Stack screenOptions={{
                  headerShown: false,
                  animation: "fade"
                }}>
                </Stack>
              </GetProductsProvider> 
              </PagesContextProvider>
            </SignInContextProvider>
          </SignUpContextProvider>
        </PaperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
