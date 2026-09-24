import { Credential } from "@/components/ticket";
import { useLocalSearchParams } from "expo-router";
// TODO: ajustar pro path real do componente de cartão que você já tem pronto

// Sugestão de rota: app/ticket/[id].tsx
// Esse arquivo só monta o objeto `badgeStore` a partir dos params de
// navegação e repassa pro seu componente de cartão já existente —
// não recria o cartão em si.
export default function TicketScreen() {
  const { id, name, email, eventTitle, eventDate, image, checkingUrl } =
    useLocalSearchParams<{
      id: string;
      name: string;
      email: string;
      eventTitle: string;
      eventDate: string;
      image: string;
      checkingUrl: string;
    }>();

  return (
    <Credential
        data={{checkInURL: checkingUrl, email, eventDate, eventTitle, id, name, image}}
    />
  );
}