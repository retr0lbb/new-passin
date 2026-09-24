import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { EventCardButton } from "../event-card";
import { FormField } from "./field";

interface EventSubscribeFormProps {
  eventTitle: string;
  onSubmit: (values: { name: string; email: string }) => Promise<void> | void;
}

export function EventSubscribeForm({
  eventTitle,
  onSubmit,
}: EventSubscribeFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const isValid = name.trim().length > 0 && email.trim().length > 0;

  async function handleSubmit() {
    if (!isValid || isSubmitting) return;

    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), email: email.trim() });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View className="flex-1 justify-center gap-8 bg-zinc-950 px-6">
      <View className="items-center gap-1">
        <Text className="text-sm text-zinc-400">
          Você está se inscrevendo em
        </Text>
        <Text className="text-center text-2xl font-bold text-white">
          {eventTitle}
        </Text>
      </View>

      <View className="gap-4">
        <FormField label="Nome completo" required>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
            placeholderTextColor="#71717a"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-zinc-200"
          />
        </FormField>

        <FormField label="E-mail" required>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor="#71717a"
            autoCapitalize="none"
            keyboardType="email-address"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-zinc-200"
          />
        </FormField>
      </View>

      <EventCardButton
        label={isSubmitting ? "Confirmando..." : "Confirmar inscrição"}
        onPress={handleSubmit}
        disabled={!isValid || isSubmitting}
      />
    </View>
  );
}