import { Search } from "lucide-react-native";
import { TextInput, TextInputProps, View } from "react-native";

interface SearchInputProps extends Omit<TextInputProps, "placeholderTextColor"> {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Buscar trilhas ou workshops...",
  ...rest
}: SearchInputProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3">
      <Search size={20} color="#a1a1aa" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#71717a"
        className="flex-1 text-base text-zinc-200"
        {...rest}
      />
    </View>
  );
}