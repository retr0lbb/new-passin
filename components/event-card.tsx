import { useRouter } from "expo-router";
import { Calendar } from "lucide-react-native";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

export interface Event {
  id: string;
  title: string;
  detail: string;
  imageKey: string;
  slug: string;
  maximumAttendees: number;
  eventDate: Date;
  limitDateToSubscribe: Date;
  categoryId: string;
}

// O `eventDate` pode não chegar como um `Date` de verdade dependendo da
// origem (ex: Firestore Timestamp tem `.toDate()`, não `.toISOString()`;
// APIs que serializam pra JSON mandam string). Essa função normaliza
// qualquer um desses formatos pra um `Date` de verdade.
function toJSDate(value: unknown): Date {
  if (value instanceof Date) return value;

  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate: unknown }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate();
  }

  return new Date(value as string | number);
}

interface EventImageProps {
  source: ImageSourcePropType;
  children?: React.ReactNode;
}
export function EventImage({ source, children }: EventImageProps) {
  return (
    <View className="relative h-48 w-full overflow-hidden rounded-2xl bg-zinc-800">
      <Image source={source} className="h-full w-full" resizeMode="cover" />
      {children}
    </View>
  );
}

interface EventDateBadgeProps {
  date: Date;
}

export function EventDateBadge({ date }: EventDateBadgeProps) {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(date);

  return (
    <View className="absolute bottom-3 left-3 flex-row items-center gap-2 rounded-full bg-zinc-900/90 px-3 py-1.5">
      <Calendar size={14} color="#fb923c" />
      <Text className="text-xs font-medium capitalize text-zinc-100">
        {formatted}
      </Text>
    </View>
  );
}

interface EventCardButtonProps {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export function EventCardButton({
  label = "Garantir vaga",
  onPress,
  disabled = false,
}: EventCardButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      className={`items-center rounded-full bg-orange-400 px-6 py-3 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <Text className="text-sm font-bold uppercase text-zinc-900">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface EventCardProps {
  event: Event;
  // Opcional: se você não passar, o clique já navega direto pra tela de
  // inscrição. Passe isso quando precisar de um comportamento diferente
  // (ex: futuramente abrir uma tela de "ver detalhes" em vez de inscrever).
  onPressAction?: () => void;
}

export function EventCard({ event, onPressAction }: EventCardProps) {
  const router = useRouter();
  const eventDate = toJSDate(event.eventDate);

  function handlePress() {
    if (onPressAction) {
      onPressAction();
      return;
    }

    router.push({
      pathname: "/event/[id]/subscribe",
      params: {
        id: event.id,
        eventTitle: event.title,
        eventDate: eventDate.toISOString(),
      },
    });
  }

  return (
    <View className="gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-3">
      <EventImage source={{ uri: event.imageKey }}>
        <EventDateBadge date={eventDate} />
      </EventImage>

      <View className="gap-2 px-1">
        <Text className="text-xl font-bold text-white">{event.title}</Text>
        <Text className="text-sm leading-5 text-zinc-400">
          {event.detail}
        </Text>
      </View>

      <View className="mx-1 h-px bg-zinc-800" />

      <View className="px-1 pb-1">
        <EventCardButton onPress={handlePress} />
      </View>
    </View>
  );
}