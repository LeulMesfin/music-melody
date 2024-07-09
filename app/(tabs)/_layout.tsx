import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Sliders, Music, User } from '@tamagui/lucide-icons'

/* Tab layout listing all the relevant screens of my tab */
const TabLayout = () => {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.green10.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Genre',
          tabBarIcon: ({ color }) => <Sliders color={color} />,
        }}
      />
      <Tabs.Screen
        name="playlist"
        options={{
          title: 'Playlists',
          tabBarIcon: ({ color }) => <Music color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout;