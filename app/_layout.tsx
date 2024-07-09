import '../tamagui-web.css'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { TamaguiProvider } from 'tamagui'
import { tamaguiConfig } from '../tamagui.config'
import { EmailProvider } from './components/EmailComponent'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)/index',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return <RootLayoutNav />
}


const App = () => {
  // Rendering the pages of my application: auth screen and all the tab screens
  const colorScheme = useColorScheme()
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  )
}

const RootLayoutNav = () => {
  return (
    // Passing emailProvider state to the app using a context
    <EmailProvider>
      <App />
    </EmailProvider>
  )
}

export default RootLayout;