import { CircleFadingPlus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export interface Category {
  id: string;
  label: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreateCategory: () => void;
}

export function CategorySelector({
  categories,
  selectedId,
  onSelect,
  onCreateCategory,
}: CategorySelectorProps) {
  return (
    <View className="gap-3">
      <View className="flex-row flex-wrap gap-3">
        {categories.map((category) => {
          const isSelected = category.id === selectedId;

          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => onSelect(category.id)}
              activeOpacity={0.85}
              className={`w-[47%] flex-row items-center justify-between gap-2 rounded-2xl border px-4 py-3 ${
                isSelected
                  ? "border-orange-400/60 bg-orange-400/10"
                  : "border-zinc-700 bg-zinc-900"
              }`}
            >
              <View className="flex-row items-center gap-2">
                {/* <category.Icon
                  size={16}
                  color={isSelected ? "#fb923c" : "#a1a1aa"}
                /> */}
                <Text
                  className={`text-sm font-medium ${
                    isSelected ? "text-orange-300" : "text-zinc-300"
                  }`}
                >
                  {category.label}
                </Text>
              </View>
              <View
                className={`h-3 w-3 rounded-full border ${
                  isSelected
                    ? "border-orange-400 bg-orange-400"
                    : "border-zinc-600"
                }`}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={onCreateCategory}
        activeOpacity={0.85}
        className="flex-row items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-700 px-4 py-3"
      >
        <CircleFadingPlus size={16} color="#a1a1aa" />
        <Text className="text-sm font-medium text-zinc-300">
          Criar nova categoria
        </Text>
      </TouchableOpacity>
    </View>
  );
}