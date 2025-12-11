import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#6bc7f5ff",
        },
      }}
    >
      <Tabs.Screen
        name="home-page"
        options={{
          title: 'الصفحة الرئيسية',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="myfavorites"
        options={{
          title: "المفضلة",
        tabBarIcon: ({ color }) => <Ionicons size={28} name="heart" color={color} />
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "الاشعارات",
        tabBarIcon: ({ color }) => <Ionicons size={28} name="notifications" color={color} />
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "الإعدادات",
        tabBarIcon: ({ color }) => <IconSymbol size={28} name='paperplane.fill' color={color} />
        }}
      />

<Tabs.Screen
        name="myprofile"
        options={{
          title: "حسابي",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill.badge.minus" color={color} />,
        }}
      />
    </Tabs>
  );
}

