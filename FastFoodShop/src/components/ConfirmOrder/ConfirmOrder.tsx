import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BacketItem from "../UI/Cart/BacketItem";
import styles from "./ConfirmOrder.module.css";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { clearCart } from "../../store/cartSlice";
import { removeItem } from "../../store/cartSlice";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const appliedCoupon = useSelector(
    (state: RootState) => state.cart.appliedCoupon
  );
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 5;
  const discount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const total = subtotal - discount + deliveryFee;

  const handleConfirm = async () => {
    if (!address) {
      setMessage("Please enter your delivery address!");
      setIsMessageVisible(true);
      setTimeout(() => setIsMessageVisible(false), 5000);
      return;
    }

    if (!currentUser) {
      setMessage("You must be logged in to place an order!");
      setIsMessageVisible(true);
      setTimeout(() => setIsMessageVisible(false), 5000);
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        user: {
          id: currentUser.id,
          nickname: currentUser.nickname,
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        discount,
        deliveryFee,
        total,
        address,
        notes,
        createdAt: serverTimestamp(),
      });

      setMessage("Order submitted successfully!");
      setIsMessageVisible(true);

      setTimeout(() => {
        setIsMessageVisible(false);
        navigate("/");
        dispatch(clearCart());
      }, 3000);
    } catch (error) {
      console.error("Error adding order: ", error);
      setMessage("Failed to submit order. Try again!");
      setIsMessageVisible(true);
      setTimeout(() => setIsMessageVisible(false), 5000);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div style={{ pointerEvents: "none" }}>
        <Header />
      </div>

      <main className={styles.mainContent}>
        <div>
          <button onClick={() => navigate("/")} className={styles.backBtn}>
            ← Back
          </button>
        </div>
        <h2>Order Confirmation</h2>

        {isMessageVisible && (
          <div className={styles.infoMessage}>{message}</div>
        )}

        <div className={styles.section}>
          <h3>Your Order:</h3>
          {items.length > 0 ? (
            <div className={styles.itemsList}>
              {items.map((item) => (
                <BacketItem
                  key={item.id}
                  item={item}
                  onDelete={() => dispatch(removeItem(item.id))}
                />
              ))}
            </div>
          ) : (
            <p>No items in order</p>
          )}
        </div>

        <div className={styles.section}>
          <h3>Your Address:</h3>
          <input
            type="text"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.section}>
          <h3>Your Notes:</h3>
          <textarea
            placeholder="Any special requests?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={styles.textarea}
          />
        </div>
        {items.length > 0 && (
          <div className={styles.section}>
            <h3>Order Summary:</h3>
            <p>Subtotal: £{subtotal.toFixed(2)}</p>
            {appliedCoupon && (
              <p>
                Discount ({appliedCoupon.code}): -£{discount.toFixed(2)}
              </p>
            )}
            <p>Delivery: £{deliveryFee.toFixed(2)}</p>
            <p className={styles.total}>Total to pay: £{total.toFixed(2)}</p>
          </div>
        )}
        <button className={styles.confirmBtn} onClick={handleConfirm}>
          Confirm Order
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmOrder;
