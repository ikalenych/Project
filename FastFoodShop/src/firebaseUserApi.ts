import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function registerUser(nickname: string, password: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("User already exists");
  }

  const docRef = await addDoc(usersRef, { nickname, password });
  return { id: docRef.id, nickname };
}

export async function loginUser(nickname: string, password: string) {
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("nickname", "==", nickname),
    where("password", "==", password)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Invalid credentials");
  }

  const doc = snapshot.docs[0];
  return { id: doc.id, nickname: doc.data().nickname };
}
