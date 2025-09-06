import styles from "./Cart.module.css";
import BacketItem from "../../UI/Cart/BacketItem";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { removeItem } from "../../../store/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCouponByCode } from "../../../couponApi";
import type { Coupon } from "../../../couponApi";

interface CartProps {
  hideTime?: boolean;
}

const Cart = ({ hideTime }: CartProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state: RootState) => state.cart.items);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(null);
  const [isError, setIsError] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 5;
  const discount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const total = subtotal + deliveryFee - discount;

  const handleDelete = (id: string) => dispatch(removeItem(id));

  const handleCheckout = () => {
    if (total < 25) {
      setErrorMessage(
        <>
          Minimum order value is £25, You must spend{" "}
          <span className={styles.highlight}>
            £{(25 - total).toFixed(2)} more
          </span>{" "}
          for the checkout!
        </>
      );
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
      return;
    }

    if (!currentUser) {
      setErrorMessage(
        <>
          You must be <span className={styles.highlight}>logged in</span> to
          proceed with checkout!
        </>
      );
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
      return;
    }

    navigate("/confirm-order");
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;

    if (appliedCoupon) {
      setErrorMessage(<>Only one coupon can be applied at a time!</>);
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
      return;
    }

    const coupon = await getCouponByCode(couponCode);

    if (!coupon) {
      setErrorMessage(
        <>
          Coupon <span className={styles.highlight}>{couponCode}</span> is
          invalid!
        </>
      );
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
      return;
    }

    setAppliedCoupon(coupon);

    setIsError(false);
  };

  return (
    <div className={styles.cart}>
      {!hideTime && (
        <div className={styles.time}>
          <p>
            <img src="Clock.svg" alt="clock" />
            Open until 3:00pm
          </p>
        </div>
      )}

      <div className={styles.backet}>
        <div className={styles.backetHeader}>
          <img src="cartIcon.svg" alt="cart" /> My Basket
        </div>

        <div className={styles.basketBody}>
          {items.length > 0 ? (
            items.map((item) => (
              <BacketItem key={item.id} item={item} onDelete={handleDelete} />
            ))
          ) : (
            <p className={styles.empty}>Your basket is empty</p>
          )}

          <div className={styles.summary}>
            <div className={styles.row}>
              <span>Sub Total:</span>
              <span style={{ fontWeight: 300 }}>£{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.row}>
              <span>Discounts:</span>
              <span style={{ fontWeight: 300 }}>-£{discount.toFixed(2)}</span>
            </div>
            <div className={styles.row}>
              <span>Delivery Fee:</span>
              <span style={{ fontWeight: 300 }}>£{deliveryFee.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.totalToPay}>
            <span>Total to pay</span>
            <span>£{total.toFixed(2)}</span>
          </div>

          <div className={styles.coupon}>
            <input
              type="text"
              placeholder="Apply Coupon Code here"
              className={styles.couponInput}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className={styles.applyBtn} onClick={handleApplyCoupon}>
              →
            </button>
          </div>

          <button
            className={`${styles.checkout} ${
              isError ? styles.checkoutError : ""
            }`}
            onClick={handleCheckout}
          >
            <span
              className={`${styles.arrow} ${isError ? styles.arrowError : ""}`}
            >
              {">"}
            </span>
            Checkout!
          </button>

          {isError && <div className={styles.errorMessage}>{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
