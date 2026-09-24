import { CustomTabButton } from '@/components/tabButton';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import { Tabs } from 'expo-router';
import { CalendarPlus, Ticket } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, false),
        tabBarStyle: {
          paddingHorizontal: 20,
          paddingVertical: 8,
          minHeight: 64,
          backgroundColor: "#121719",
          borderWidth: 0
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              label="Events"
              route="/"
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Ticket
              size={22}
              color={focused ? "#00292E" : "#F48F56"}
            />
          ),
          tabBarShowLabel: false,
          title: "Events"
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              label="Create Event"
              route="/events"
            />
          ),
          tabBarIcon: ({ focused }) => (
            <CalendarPlus
              size={22}
              color={focused ? "#00292E" : "#F48F56"}
            />
          ),
          tabBarShowLabel: false,
          title: "Create event"
        }}
      />

      <Tabs.Screen
        name="event/[id]/subscribe/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="/ticket/[id]"
        options={{ href: null }}
      />
    <Tabs.Screen
      name="ticket/[id]"
      options={{ href: null }}
    />
    </Tabs>
  );
}
