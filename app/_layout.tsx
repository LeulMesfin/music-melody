import '../tamagui-web.css'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'
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

export default function RootLayout() {
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

function App() {
  const colorScheme = useColorScheme()
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  )
}
function RootLayoutNav() {
  return (
    <EmailProvider>
      <App />
    </EmailProvider>
  )
  // const colorScheme = useColorScheme()

  // return (
  //   <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
  //     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //       <Stack>
  //         <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
  //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
  //       </Stack>
  //     </ThemeProvider>
  //   </TamaguiProvider>
  // )
}
