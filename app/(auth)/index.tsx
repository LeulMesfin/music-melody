import { useTheme } from 'tamagui'
import { router } from 'expo-router';
import { SignInScreen } from './signIn';

/* This function returns a sign in screen component while passing 
 * in a prop that changes the screen to /(tabs). */
export default function AuthIndex() {
  const theme = useTheme()

  /* This function replaces the current screen with /(tabs).
   * the replace function substitutes the current route 
   * in the navigation stack with a new one, replacing the
   * current screen with a new one without adding to the stack. */
  const handleSignIn = () => {
    router.replace('/(tabs)');
  }

  return <SignInScreen onSignIn={handleSignIn} />
}