import { useTags } from "@/hooks/useTags";
import { Beef } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { EventCardButton } from "../event-card";
import { AttendeesStepper } from "./atendee-stepper";
import { Category, CategorySelector } from "./category-selector";
import { CreateCategoryModal } from "./create-category.modal";
import { DateTimeField } from "./date-field";
import { FormField } from "./field";


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
  const [categories, setCategories] = useState<Category[]>([])
  const {getTags, createTag} = useTags()

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

  useEffect(() => {
    async function exec(){
      const fetchCategories = await getTags()
      const modCat: Category[] = fetchCategories.map(cat => ({id: cat.id, label: cat.name}))
      setCategories(modCat)
    }
    exec()
  }, [])

  if(!categories){
    return
  }

  function withTime(base: Date, timePart: Date): Date {
    const next = new Date(base);
    next.setHours(timePart.getHours(), timePart.getMinutes(), 0, 0);
    return next;
  }

  function withDate(base: Date, datePart: Date): Date {
    const next = new Date(base);
    next.setFullYear(
      datePart.getFullYear(),
      datePart.getMonth(),
      datePart.getDate()
    );
    return next;
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
          categories={categories}
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
              mode="date"
              value={eventDate}
              onChange={(date) =>
                setEventDate((prev) => withDate(prev ?? new Date(), date))
              }
            />
          </FormField>
        </View>

        <View className="flex-1">
          <FormField label="Horário" required>
            <DateTimeField
              placeholder="Selecionar horário"
              mode="time"
              value={eventDate}
              onChange={(time) => 
                setEventDate(prev => withTime(prev ?? new Date, time))
              }
            />
          </FormField>
        </View>
      </View>

      <FormField label="Prazo de inscrição" required>
        <DateTimeField
          mode="date"
          placeholder="Selecionar prazo limite"
          value={limitDateToSubscribe}
          onChange={setLimitDateToSubscribe}
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
        onCreate={async (name) => {
          const id = await createTag({name: name})
          setCategories(prev => [...prev, {id, label: name, Icon: Beef}])
        }}
      />
    </ScrollView>
  );
}