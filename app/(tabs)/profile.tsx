import { Text, View, H1, YStack, H2, Avatar, XStack, Button } from 'tamagui'
import React from 'react'

export default function ProfileScreen() {
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
