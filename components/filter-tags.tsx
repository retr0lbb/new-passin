import { Tag } from "@/hooks/useTags";
import { ScrollView, Text, TouchableOpacity } from "react-native";


interface FilterTagsProps {
  tags: Tag[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function FilterTags({ tags, selectedId, onSelect }: FilterTagsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {tags.map((tag) => {
        const isSelected = tag.id === selectedId;

        return (
          <TouchableOpacity
            key={tag.id}
            onPress={() => onSelect(tag.id)}
            activeOpacity={0.8}
            className={`rounded-full border px-5 py-2.5 ${
              isSelected
                ? "border-orange-400 bg-orange-400"
                : "border-zinc-700 bg-zinc-900"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                isSelected ? "text-zinc-900" : "text-zinc-200"
              }`}
            >
              {tag.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}