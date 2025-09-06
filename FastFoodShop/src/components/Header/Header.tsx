import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store/store";
import Cart from "../MainSection/Cart/Cart";
import AuthModal from "../Auth/AuthModal";
import { logout } from "../../store/userSlice";
import styles from "./Header.module.css";

const Header = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    if (window.innerWidth <= 1260) {
      setIsCartModalOpen(true);
    } else {
      const mainSection = document.querySelector('[class*="mainSection"]');
      mainSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img
            src="logo.svg"
            alt="FastFoodShop Logo"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.actions}>
          {user ? (
            <>
              <button
                className={styles.button1}
                onClick={() => dispatch(logout()) && setHover(false)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <img src="userLogin.svg" />

                {hover ? "Logout" : user.nickname}
              </button>
            </>
          ) : (
            <button
              className={styles.button}
              onClick={() => setIsAuthModalOpen(true)}
            >
              <img src="userLogin.svg" />
              Login/Signup
            </button>
          )}

          <button className={styles.cartHeader} onClick={handleCartClick}>
            <img src="cartIcon.svg" />
            {totalCount} items
          </button>
        </div>
      </header>

      {isCartModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <div className={styles.modalCartWrapper}>
              <Cart hideTime={true} />
            </div>
          </div>
        </div>
      )}

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </>
  );
};

export default Header;
