import { EventSubscribeForm } from "@/components/forms/subscribe-event-form";
import { useAttendees } from "@/hooks/useAttendees";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";
// TODO: ajustar pro path real do seu hook

// Sugestão de rota: app/event/[id]/subscribe.tsx
export default function SubscribeScreen() {
  const { id, eventTitle, eventDate } = useLocalSearchParams<{
    id: string;
    eventTitle: string;
    eventDate: string;
  }>();

  const router = useRouter();
  const { createAttendee } = useAttendees();

  async function handleSubmit({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) {
    try {
      // TODO: ajustar pra assinatura real do seu useAttendee.
      // Assumindo que ele retorna o Attendee criado com o `id` do Firebase.
      const attendee = await createAttendee(id, {
        name,
        email
      });

      router.replace({
        pathname: "/event/ticket/[id]",
        params: {
          id: attendee,
          name,
          email,
          eventTitle,
          eventDate,
          // Mocks — sem QR code real e sem upload de imagem por enquanto
          image: `https://i.pravatar.cc/300?u=${encodeURIComponent(email)}`,
          checkingUrl: `mock://checkin/${attendee}`,
        },
      });
    } catch (error) {
      Alert.alert(
        "Não foi possível se inscrever",
        "Tente novamente em instantes."
      );
    }
  }

  return (
    <EventSubscribeForm eventTitle={eventTitle} onSubmit={handleSubmit} />
  );
}