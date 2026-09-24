import React from "react";
import { Text, View } from "react-native";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, required, children }: FormFieldProps) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-white">{label}</Text>
        {required && (
          <Text className="text-xs text-zinc-500">Obrigatório</Text>
        )}
      </View>
      {children}
    </View>
  );
}