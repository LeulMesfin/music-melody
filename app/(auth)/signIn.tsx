import { FontAwesome } from '@expo/vector-icons';
import {
  Button,
  H1,
  Theme,
  View,
} from 'tamagui'
import { FormCard } from './layoutParts'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import React from 'react';
import { Platform } from 'react-native'; // can delete 
import { storeToken } from 'app/components/tokenHook';
import { useEmailContext } from 'app/components/EmailComponent';

/** simulate signin */

/* This function makes a GET request to the Spotify Web API
 * It returns a logged in User's profile info. */
async function fetchProfile(token: string): Promise<any> {
  try {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
  } catch (error) {
    console.log('Error fetching user info:', error);
    throw error;
  }
}

/* This function makes a POST request to my express API 
 * hosted on Vercel. This function will send a request to
 * the API which then communicates with the MongoDB database
 * to insert a new user to the database. */
async function postUser(data): Promise<any> {
  try {
    const result = await fetch("https://music-app-api-sand.vercel.app/users", {
      method: "POST", headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    return await result.json();
  } catch (error) {
    console.error('Detailed error:', error);
    throw error;
  }
}

WebBrowser.maybeCompleteAuthSession();
const MY_SECURE_AUTH_STATE_KEY = '';

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};
  

/** ------ EXAMPLE ------ */
export function SignInScreen({ onSignIn }) {
  const { email, setEmail } = useEmailContext();
  
  // spotify auth
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
      scopes: ['user-read-email', 'playlist-modify-public'],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'music-melody'
     }),
    },
    discovery);

    console.log('Redirect URI:', request?.redirectUri); // for testing
    
    /* Implicit-flow: this method has inherent security risks,
     * for better security, I can transition this to auth code with PKCE
     *  more info: https://docs.expo.dev/guides/authentication/#improving-user-experience */
    const spotifyAuth = async () => {
      console.log("Button is pressed - spotifyAuth function called");
        try {
          const res = await promptAsync();
          if (res && res.type === 'success') {
            const token = res.params.access_token;
            if (Platform.OS !== 'web') {
              // Securely store the auth on your device using secure storage
              storeToken(token);
            }
            const profile = await fetchProfile(token);
            console.log("profile: ", profile);
            setEmail(profile.email)
            const data = {
                "email": profile.email,
                "playlists": [] // leave empty for now...
            };
            console.log(data);
            postUser(data); // post user to DB
            onSignIn(); // changes app screen
            
          }
        } catch(error) {
            console.error('An error occurred during authentication:', error);
        }
    }

  return (
    <FormCard>
      <View
        flexDirection="column"
        alignItems="stretch"
        minWidth="100%"
        maxWidth="100%"
        gap="$18" // gap between h1 and btn
        padding="$4"
        paddingVertical="$6"
        $gtSm={{
          paddingVertical: '$4',
          width: 400,
        }}
      >
        <H1
          marginTop="$11" 
          alignSelf="center"
          size="$8"
          $xs={{
            size: '$10',
          }}
        >
          Music Scout
        </H1>
        <View flexDirection="column" gap="$3" width="100%" alignItems="center">
          <Theme>
            <View
              flexDirection="column"
              gap="$3"
              width="100%"
              alignSelf="center"
              alignItems="center"
            >
              
            <View flexDirection="row" flexWrap="wrap" gap="$3">
            <Button
              flex={1}
              minWidth="100%"
              size="$6"
              variant="outlined"
              backgroundColor="black"
              color="white"
              disabled={false}//{!request}
              onPress={spotifyAuth}>
                  <Button.Icon>
                      <FontAwesome name="spotify" size={24} color="green" />
                  </Button.Icon>
                  <Button.Text>Continue with Spotify</Button.Text>
            </Button>
            </View>
            </View>
          </Theme>
        </View>
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
