import { Computer, PawPrint } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { EventCardButton } from "../event-card";
import { AttendeesStepper } from "./atendee-stepper";
import { Category, CategorySelector } from "./category-selector";
import { CreateCategoryModal } from "./create-category.modal";
import { DateTimeField } from "./date-field";
import { FormField } from "./field";

const CATEGORIES: Category[] = [
  { id: "164aeba7-8ab8-42e3-a531-ba842c210b4f", label: "FurMeet", Icon: PawPrint },
  { id: "ebebc2fb-9bd7-42f2-af23-fbc232d22332", label: "TechEvent", Icon: Computer },
];


export interface EventFormPayload {
  title: string;
  detail: string;
  imageKey: string;
  maximumAttendees: number;
  eventDate: Date | null;
  limitDateToSubscribe: Date | null;
  categoryId: string | null;
}

interface EventFormProps {
  onSubmit: (payload: EventFormPayload) => void;
}

export function EventForm({ onSubmit }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [maximumAttendees, setMaximumAttendees] = useState(50);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  // TODO: hoje só guardamos o Date "cru" quando um picker real for plugado
  // nos onPress dos DateTimeField abaixo. Por enquanto ficam null.
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [limitDateToSubscribe, setLimitDateToSubscribe] =
    useState<Date | null>(null);

  function handleSubmit() {
    onSubmit({
      title,
      detail,
      imageKey,
      maximumAttendees,
      eventDate,
      limitDateToSubscribe,
      categoryId,
    });
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 20, padding: 16 }}>
      <FormField label="Nome do Evento / Talk" required>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Construindo Microsserviços com Go & gRPC"
          placeholderTextColor="#71717a"
          className="rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-zinc-200"
        />
      </FormField>

      <FormField label="Categoria / Trilha" required>
        <CategorySelector
          categories={CATEGORIES}
          selectedId={categoryId}
          onSelect={setCategoryId}
          onCreateCategory={() => setCategoryModalVisible(true)}
        />
      </FormField>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <FormField label="Data" required>
            <DateTimeField
              placeholder="Selecionar data"
              onPress={() => {
                // TODO: abrir date picker e atualizar `eventDate`
              }}
            />
          </FormField>
        </View>

        <View className="flex-1">
          <FormField label="Horário" required>
            <DateTimeField
              placeholder="Selecionar horário"
              onPress={() => {
                // TODO: abrir time picker e mesclar com a data em `eventDate`
              }}
            />
          </FormField>
        </View>
      </View>

      <FormField label="Prazo de inscrição" required>
        <DateTimeField
          placeholder="Selecionar prazo limite"
          onPress={() => {
            // TODO: abrir date picker e atualizar `limitDateToSubscribe`
          }}
        />
      </FormField>

      <FormField label="Capacidade" required>
        <AttendeesStepper
          value={maximumAttendees}
          onChange={setMaximumAttendees}
        />
      </FormField>

      <FormField label="URL da imagem" required>
        <TextInput
          value={imageKey}
          onChangeText={setImageKey}
          placeholder="https://..."
          placeholderTextColor="#71717a"
          autoCapitalize="none"
          keyboardType="url"
          className="rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-zinc-200"
        />
      </FormField>

      <FormField label="Detalhes do evento" required>
        <TextInput
          value={detail}
          onChangeText={setDetail}
          placeholder="Descreva a sessão ou trilha técnica..."
          placeholderTextColor="#71717a"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          className="min-h-24 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-zinc-200"
        />
      </FormField>

      <EventCardButton label="Criar evento" onPress={handleSubmit} />

      <CreateCategoryModal
        visible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
      />
    </ScrollView>
  );
}