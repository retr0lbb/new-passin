import { Calendar } from "lucide-react-native";
import { Text, TouchableOpacity } from "react-native";

interface DateTimeFieldProps {
  placeholder: string;
  value?: string;
  onPress: () => void;
}

// Visual apenas por enquanto: o onPress é o lugar certo para futuramente
// abrir um date/time picker nativo (ex: @react-native-community/datetimepicker)
// e atualizar o valor exibido.
export function DateTimeField({
  placeholder,
  value,
  onPress,
}: DateTimeFieldProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3"
    >
      <Calendar size={18} color="#a1a1aa" />
      <Text className={`text-base ${value ? "text-zinc-200" : "text-zinc-500"}`}>
        {value ?? placeholder}
      </Text>
    </TouchableOpacity>
  );
}