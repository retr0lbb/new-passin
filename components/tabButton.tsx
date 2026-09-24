import { usePathname } from "expo-router";
import { BottomTabBarButtonProps } from "expo-router/build/react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";

interface CustomTabButtonProps extends BottomTabBarButtonProps {
  label: string;
  route: string;
}

export function CustomTabButton({
  children,
  onPress,
  label,
  route,
}: CustomTabButtonProps) {
  const pathname = usePathname();

  const focused = pathname === route;

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center"
    >
      <View
        className={`
          flex-row items-center justify-center
          rounded-md px-4 py-2
          ${focused ? "bg-brand-orange" : "bg-transparent"}
        `}
      >
        {children}

        {focused && (
          <Text className="ml-2 font-semibold text-brand-dark">
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}