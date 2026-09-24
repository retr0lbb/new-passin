import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

interface CreateCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  // TODO: sem lógica de criação ainda — só a estrutura visual.
  // Quando a criação de categoria for implementada, esse callback deve
  // receber o nome digitado e disparar a chamada pra API / mutation.
  onCreate?: (name: string) => void;
}

export function CreateCategoryModal({
  visible,
  onClose,
  onCreate,
}: CreateCategoryModalProps) {
  const [name, setName] = useState("");

  function handleCreate() {
    onCreate?.(name);
    setName("");
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/70 px-6">
        <View className="w-full gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
          <Text className="text-lg font-bold text-white">Nova categoria</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome da categoria"
            placeholderTextColor="#71717a"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-zinc-200"
          />

          <View className="flex-row gap-3">
            <Pressable
              onPress={onClose}
              className="flex-1 items-center rounded-full border border-zinc-700 py-3"
            >
              <Text className="text-sm font-semibold text-zinc-300">
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              onPress={handleCreate}
              className="flex-1 items-center rounded-full bg-orange-400 py-3"
            >
              <Text className="text-sm font-bold text-zinc-900">Criar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}