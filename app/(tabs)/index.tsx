import { H2, XStack, YStack, Button } from 'tamagui'

/* Genre screen */
// named index because this page will be loaded initally as soon as a user authenticates
const GenreScreen = () => {
  return (
    <YStack f={1} ai="center" gap="$16" px="$10" pt="$5">
      <H2>Select a genre</H2>

      <XStack gap="$4" jc="center" pl="8%">
        <Button themeInverse size="$5" backgroundColor="black" width={150} minWidth={150}>
          Pop
        </Button>
        <Button themeInverse size="$5" backgroundColor="black" width={150} minWidth={150}>
          Hip-Hop/Rap
        </Button>
      </XStack>
      <XStack gap="$4" jc="center" pl="8%">
        <Button themeInverse size="$5" backgroundColor="black" width={150} minWidth={150}>
          Reggaeton
        </Button>
        <Button themeInverse size="$5" backgroundColor="black" width={150} minWidth={150}>
          Country
        </Button>
      </XStack>

        
    </YStack>
  )
}

export default GenreScreen;