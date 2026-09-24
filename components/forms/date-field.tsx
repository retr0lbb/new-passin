import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";

interface DateTimeFieldProps {
  mode: "date" | "time";
  placeholder: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

export function DateTimeField({
  mode,
  placeholder,
  value,
  onChange,
}: DateTimeFieldProps) {
  // No Android o picker é imperativo (abre um dialog do sistema e some).
  // No iOS a gente controla a visibilidade e mostra num modal próprio.
  const [showIosPicker, setShowIosPicker] = useState(false);

  function handlePress() {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: value ?? new Date(),
        mode,
        is24Hour: true,
        onChange: (_event, selectedDate) => {
          if (selectedDate) onChange(selectedDate);
        },
      });
      return;
    }

    setShowIosPicker(true);
  }

  const formatted = value
    ? mode === "date"
      ? value.toLocaleDateString("pt-BR")
      : value.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
    : null;

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className="flex-row items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3"
      >
        <Calendar size={18} color="#a1a1aa" />
        <Text
          className={`text-base ${
            formatted ? "text-zinc-200" : "text-zinc-500"
          }`}
        >
          {formatted ?? placeholder}
        </Text>
      </TouchableOpacity>

      {Platform.OS === "ios" && (
        <Modal visible={showIosPicker} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/50">
            <View className="gap-3 rounded-t-3xl bg-zinc-950 p-4 pb-8">
              <DateTimePicker
                value={value ?? new Date()}
                mode={mode}
                display="spinner"
                themeVariant="dark"
                onChange={(_event, selectedDate) => {
                  if (selectedDate) onChange(selectedDate);
                }}
              />
              <TouchableOpacity
                onPress={() => setShowIosPicker(false)}
                activeOpacity={0.85}
                className="items-center rounded-full bg-orange-400 py-3"
              >
                <Text className="text-sm font-bold text-zinc-900">
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}