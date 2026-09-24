import { Minus, Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface AttendeesStepperProps {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
}

export function AttendeesStepper({
  value,
  onChange,
  step = 10,
  min = 0,
}: AttendeesStepperProps) {
  return (
    <View className="flex-row items-center justify-between rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2">
      <TouchableOpacity
        onPress={() => onChange(Math.max(min, value - step))}
        activeOpacity={0.8}
        className="h-9 w-9 items-center justify-center rounded-xl bg-zinc-800"
      >
        <Minus size={18} color="#e4e4e7" />
      </TouchableOpacity>

      <Text className="text-base font-semibold text-white">
        {value} vagas
      </Text>

      <TouchableOpacity
        onPress={() => onChange(value + step)}
        activeOpacity={0.8}
        className="h-9 w-9 items-center justify-center rounded-xl bg-zinc-800"
      >
        <Plus size={18} color="#e4e4e7" />
      </TouchableOpacity>
    </View>
  );
}