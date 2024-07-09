import { Text, View, H1, YStack, H2, Avatar, XStack, Button } from 'tamagui'
import React from 'react'
import { tokenHook } from 'app/tokenHook';
import { useEmailContext } from 'app/components/EmailComponent';

/* task:
 * store the user's spotify id into the db for id, change the data model
 * make a GET to spotify web api to get the id, then send a get request to express api 
 * to delete a user with this id. */

/* This function makes a DELETE request to my express API 
 * hosted on Vercel. This function will send a request to
 * the API which then communicates with the MongoDB database
 * to delete a specified user from the database. */
const deleteUser = async(data): Promise<any> => {
    try {
      const result = await fetch("https://music-app-api-sand.vercel.app/users", {
        method: "DELETE", headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)
      });
      return await result.json();
    } catch (error) {
      console.error('Detailed error:', error);
      throw error;
    }
  }

  const getUser = async(userEmail: string): Promise<any> => {
    try {
      const result = await fetch(`https://music-app-api-sand.vercel.app/users/${userEmail}`, {
        method: "GET", headers: {'Content-Type': 'application/json' }
      });
      return await result.json();
    } catch (error) {
      console.error('Detailed error:', error);
      throw error;
    }
  }


export default function ProfileScreen() {
  const { email } = useEmailContext();
  console.log("email in profile: ", email);
  return (
    <YStack f={1} gap="$12" pt="$7" ai="center">
        <XStack alignItems="center" space="$6">
            <Avatar circular size="$15">
                <Avatar.Image
                accessibilityLabel="Nate Wienert"
                src={require('../../assets/images/goat.jpeg')}
                // src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                />
                <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
            </Avatar>
        </XStack>

        <YStack gap="$6">
            <Button themeInverse size="$6" backgroundColor="black" width={200} minWidth={200}>
                Clear Playlists
            </Button>
            <Button themeInverse size="$6" backgroundColor="black" width={200} minWidth={200}>
                Delete Account
            </Button>
            <Button themeInverse size="$6" backgroundColor="black" width={200} minWidth={200}>
                Log out
            </Button>
         </YStack>
    </YStack>
    
  )
}
