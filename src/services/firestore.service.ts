import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection as Collection,
  getDocs,
  Firestore,
  where,
  query,
  orderBy as firebaseOrderBy,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { environment } from "../config/env.config";

const app = initializeApp(environment.firebase);

interface FirestoreService {
  get: (
    collection: string,
    params?: Record<string, any>,
    orderBy?: Record<string, boolean>
  ) => Promise<Array<Record<string, any>>>;
  patch: (
    collection: string,
    id: string,
    body: Record<string, any>
  ) => Promise<void>;
}

export const firestoreService: FirestoreService = {
  get: async (
    collection: string,
    params?: Record<string, any>,
    orderBy?: Record<string, boolean>
  ) => {
    const firestore = getFirestore(app);
    const collectionReference = Collection(firestore, collection);
    let queryReference = query(collectionReference);
    if (params) {
      Object.keys(params).forEach((key) => {
        queryReference = query(queryReference, where(key, "==", params[key]));
      });
    }
    if (orderBy) {
      Object.keys(orderBy).forEach((key) => {
        queryReference = query(
          queryReference,
          firebaseOrderBy(key, orderBy[key] ? "asc" : "desc")
        );
      });
    }
    const querySnapshot = await getDocs(queryReference);
    const response: Array<Record<string, any>> = querySnapshot.docs.map(
      (doc) => doc.data() as Record<string, any>
    );
    return response;
  },
  patch: async (collection: string, id: string, body: Record<string, any>) => {
    const firestore = getFirestore(app);
    const collectionReference = Collection(firestore, collection);
    const documentReference = doc(collectionReference, id);
    await setDoc(documentReference, body, { merge: true });
  },
};
