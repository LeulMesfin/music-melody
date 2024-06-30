import { Link, Tabs, Stack } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { Atom, AudioWaveform } from '@tamagui/lucide-icons'
import { router } from 'expo-router';
import { SignInScreen } from './signIn';

export default function AuthIndex() {
  const theme = useTheme()

  const handleSignIn = () => {
    router.replace('/(tabs)');
  }

  return <SignInScreen onSignIn={handleSignIn} />
}