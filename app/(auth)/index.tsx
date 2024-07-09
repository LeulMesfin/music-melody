import { useTheme } from 'tamagui'
import { router } from 'expo-router';
import { SignInScreen } from './signIn';

export default function AuthIndex() {
  const theme = useTheme()

  const handleSignIn = () => {
    router.replace('/(tabs)');
  }

  return <SignInScreen onSignIn={handleSignIn} />
}