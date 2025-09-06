import { useState } from "react";
import styles from "./Menu.module.css";

const positions = [
  "Pizzas",
  "Garlic Bread",
  "Calzone",
  "Kebabas",
  "Salads",
  "Drinks",
  "Happy Meal",
  "Desserts",
  "Sauses",
  "Orbit",
];

interface MenuProps {
  active: string;
  onChange: (category: string) => void;
}

const Menu: React.FC<MenuProps> = ({ active, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.menu}>
      <div className={styles.header}>
        <h2>
          <img src="Menu.svg" alt="menu" />
          Menu
        </h2>
        <button
          className={styles.showMenu}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? "↑" : "↓"}
        </button>
      </div>

      {showMenu && (
        <div className={styles.positions}>
          {positions.map((position) => (
            <button
              key={position}
              className={`${styles.position} ${
                active === position ? styles.active : ""
              }`}
              onClick={() => onChange(position)}
            >
              {position}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
