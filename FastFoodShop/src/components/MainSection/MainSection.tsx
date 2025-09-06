import { useState, useEffect } from "react";
import styles from "./MainSection.module.css";
import Menu from "./Menu/Menu";
import Cart from "./Cart/Cart";
import Food from "./Food/Food";
import { FaSearch } from "react-icons/fa";

const MainSection = () => {
  const [activeCategory, setActiveCategory] = useState("Pizzas");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowCart(window.innerWidth > 1260);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.mainSection}>
      <div className={styles.header}>
        <h2>Order from Tandoori Pizza London</h2>
        <div className={styles.search}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search from menu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.content}>
        <Menu active={activeCategory} onChange={setActiveCategory} />
        <Food activeCategory={activeCategory} searchTerm={searchTerm} />

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default MainSection;
