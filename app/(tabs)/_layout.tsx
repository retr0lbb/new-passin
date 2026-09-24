import { CustomTabButton } from '@/components/tabButton';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Ticket } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, false),
        tabBarStyle: {
          paddingHorizontal: 20,
          paddingVertical: 8,
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
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'chevron.left.forwardslash.chevron.right',
                android: 'code',
                web: 'code',
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
