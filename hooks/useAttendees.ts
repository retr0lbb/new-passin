import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export type Attendee = {
  id?: string;
  checkedin: boolean;
  checkinAt: Date | null;
  createdAt: Date;
  email: string;
  eventId: string;
  name: string;
};

const attendeeRef = collection(db, "atendee");

export function useAttendees() {

  async function createAttendee(
    eventId: string,
    attendee: {name: string, email: string}
  ): Promise<string> {

    const doc = await addDoc(attendeeRef, {
      ...attendee,
      checkedin: false,
      checkinAt: null,
      createdAt: new Date(),
      eventId,
    });

    return doc.id;
  }

  async function getAttendee(
    eventId: string,
    attendeeId: string
  ): Promise<Attendee | null> {

    const q = query(
      attendeeRef,
      where("eventId", "==", eventId),
      where("__name__", "==", attendeeId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];

    return {
      id: doc.id,
      ...doc.data(),
    } as Attendee;
  }

  return {
    createAttendee,
    getAttendee,
  };
}