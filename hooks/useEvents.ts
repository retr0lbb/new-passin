import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

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

const eventRef = collection(db, "events")

export function useEvents(){
    async function getEvents(): Promise<Event[]>{
        const snapshot = await getDocs(eventRef)

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            imageKey: "https://images.unsplash.com/photo-1759614079659-e64324379bbf?q=80&w=744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ...doc.data()
        })) as Event[]
    }

    async function createEvents(
        data: Omit<Event, "id">
    ){
        const document = await addDoc(eventRef, data);

        return document.id
    }

    return {getEvents, createEvents}
}