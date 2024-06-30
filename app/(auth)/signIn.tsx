import { Facebook, Github } from '@tamagui/lucide-icons'
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react'
import {
  AnimatePresence,
  Button,
  H1,
  Paragraph,
  Separator,
  SizableText,
  Spinner,
  Theme,
  View,
} from 'tamagui'
import { Input } from './inputParts'
import { FormCard } from './layoutParts'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import React from 'react';

/** simulate signin */
function useSignIn() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  return {
    status: status,
    signIn: () => {
      setStatus('loading')
      setTimeout(() => {
        setStatus('success')
      }, 2000)
    },
  }
}

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };
  

/** ------ EXAMPLE ------ */
export function SignInScreen({ onSignIn }) {
  const { signIn, status } = useSignIn()
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '051796be52404c759b36f84ac451e295',
      scopes: ['user-read-email', 'playlist-modify-public'],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'music-melody'
      }),
    },
    discovery);

    React.useEffect(() => {
      if (response?.type === 'success') {
        const { code } = response.params;
      }
    }, [response]);
  
  const handleSignIn = async () => {
    await signIn();
    if (status === 'success') {
      onSignIn();
    }
  };

  return (
    <FormCard>
      <View
        flexDirection="column"
        alignItems="stretch"
        minWidth="100%"
        maxWidth="100%"
        gap="$4"
        padding="$4"
        paddingVertical="$6"
        $gtSm={{
          paddingVertical: '$4',
          width: 400,
        }}
      >
        <H1
          alignSelf="center"
          size="$8"
          $xs={{
            size: '$7',
          }}
        >
          Sign in to your account
        </H1>
        <View flexDirection="column" gap="$3">
          <View flexDirection="column" gap="$1">
            <Input size="$4">
              <Input.Label htmlFor="email">Email</Input.Label>
              <Input.Box>
                <Input.Area id="email" placeholder="email@example.com" />
              </Input.Box>
            </Input>
          </View>
          <View flexDirection="column" gap="$1">
            <Input size="$4">
              <View
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Input.Label htmlFor="password">Password</Input.Label>
                <ForgotPasswordLink />
              </View>
              <Input.Box>
                <Input.Area
                  textContentType="password"
                  secureTextEntry
                  id="password"
                  placeholder="Enter password"
                />
              </Input.Box>
            </Input>
          </View>
        </View>
        <Theme inverse>
          <Button
            disabled={status === 'loading'}
            onPress={handleSignIn}
            width="100%"
            iconAfter={
              <AnimatePresence>
                {status === 'loading' && (
                  <Spinner
                    color="$color"
                    key="loading-spinner"
                    opacity={1}
                    scale={1}
                    animation="quick"
                    position="absolute"
                    left="60%"
                    enterStyle={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    exitStyle={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                  />
                )}
              </AnimatePresence>
            }
          >
            <Button.Text>Sign In</Button.Text>
          </Button>
        </Theme>
        <View flexDirection="column" gap="$3" width="100%" alignItems="center">
          <Theme>
            <View
              flexDirection="column"
              gap="$3"
              width="100%"
              alignSelf="center"
              alignItems="center"
            >
              <View flexDirection="row" width="100%" alignItems="center" gap="$4">
                <Separator />
                <Paragraph>Or</Paragraph>
                <Separator />
              </View>
              <View flexDirection="row" flexWrap="wrap" gap="$3">
              <Button
                flex={1}
                minWidth="100%"
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}>
                    <Button.Icon>
                        <FontAwesome name="spotify" size={24} color="black" />
                    </Button.Icon>
                    <Button.Text>Continue with Spotify</Button.Text>
                </Button>
                {/* <Button flex={1} minWidth="100%">
                  <Button.Icon>
                    <FontAwesome name="spotify" size={24} color="black" />
                  </Button.Icon>
                  <Button.Text>Continue with Spotify</Button.Text>
                </Button> */}
              </View>
            </View>
          </Theme>
        </View>
        <SignUpLink />
      </View>
    </FormCard>
  )
}



// Swap for your own Link
const Link = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <View href={href} tag="a">
      {children}
    </View>
  )
}

const SignUpLink = () => {
  return (
    <Link href={`#`}>
      <Paragraph textDecorationStyle="unset" ta="center">
        Don&apos;t have an account?{' '}
        <SizableText
          hoverStyle={{
            color: '$colorHover',
          }}
          textDecorationLine="underline"
        >
          Sign up
        </SizableText>
      </Paragraph>
    </Link>
  )
}

const ForgotPasswordLink = () => {
  return (
    <Link href={`#`}>
      <Paragraph
        color="$gray11"
        hoverStyle={{
          color: '$gray12',
        }}
        size="$1"
        marginTop="$1"
      >
        Forgot your password?
      </Paragraph>
    </Link>
  )
}
