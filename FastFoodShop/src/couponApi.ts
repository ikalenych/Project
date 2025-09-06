import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface Coupon {
  id: string;
  code: string;
  discount: number;
}

export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const couponsRef = collection(db, "coupons");
  const q = query(couponsRef, where("code", "==", code));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...(doc.data() as Omit<Coupon, "id">),
  };
}
