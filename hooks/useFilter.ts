import { useEffect, useState } from "react";
import { Event } from "./useEvents";

export function useEventFilters(
  events: Event[],
  selectedTag: string,
  search: string
) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const term = search.trim().toLowerCase();

      const result = events.filter((event) => {
        const matchesSearch =
          term === "" ||
          event.title.toLowerCase().includes(term) ||
          event.detail?.toLowerCase().includes(term);

        const matchesTag =
          selectedTag === "" ||
          event.categoryId === selectedTag;

        return matchesSearch && matchesTag;
      });

      setFilteredEvents(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [events, selectedTag, search]);

  return filteredEvents;
}