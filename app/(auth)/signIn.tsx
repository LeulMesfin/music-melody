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


/* This asynchronous function fetches a user from
 * the Spotify Web API. The function takes in a string
 * and returns a Promise of type Any. An error is thrown
 * on failure. */
const fetchProfile = async(token: string): Promise<any> => {
  try {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
  } catch (error) {
    throw error;
  }
}

/* This asynchronous function sends a POST request to
 * the music app api to an a endpoint which then posts a
 * user to a MongoDB database. This function takes in a data
 * argument of any type, and returns a Promise of any time.
 * An error is thrown on error */
const postUser =  async(data): Promise<any> => {
  try {
    const result = await fetch("https://music-app-api-sand.vercel.app/users", {
      method: "POST", headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    return await result.json();
  } catch (error) {
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
  

/* This function handles the sign in functionality
 * of a user. This includes UI and SpotifyOAuth.
 * This implementation of Auth uses the Implicit Grant Flow.
 * According to the Spotify Web API: 
 * "The implicit grant flow is carried out on the client side and it does not involve secret keys. 
 * Thus, you do not need any server-side code to use it.", as a result I am authenticating
 * on the front-end versus the back-end. Implicit grant has significant security flaws and
 * it is advised to instead use PKCE flow when authenticating. I am using Implicit Flow 
 * just to begin and will eventually modify my project to utilize PKCE flow.
 * This function takes in a prop and returns JSX markup. 
 * For more info: https://docs.expo.dev/guides/authentication/#improving-user-experience 
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow*/
export const SignInScreen = ({ onSignIn }) => {
  const { email, setEmail } = useEmailContext();
  
  // Auth request courtesy of Expo
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
    
    // Spotify auth
    const spotifyAuth = async () => {
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
