import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface Tag {
  id: string;
  name: string;
  description?: string
}

const tagsRef = collection(db, "categories")

export function useTags() {
  async function getTags(): Promise<Tag[]> {
    const snapshot = await getDocs(tagsRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tag[];
  }

  return { getTags };
}