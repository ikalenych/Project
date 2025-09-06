import styles from "./BacketItem.module.css";
import { HiTrash } from "react-icons/hi";
import type { CartItem } from "../../../store/cartSlice";

type Props = {
  item: CartItem;
  onDelete: (id: string) => void;
};

const BacketItem = ({ item, onDelete }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles.count}>{item.quantity}x</div>
      <div className={styles.itemInfo}>
        <div className={styles.price}>
          £{(item.price * item.quantity).toFixed(2)}
        </div>
        <div className={styles.name}>{item.name}</div>
        {item.description && (
          <div className={styles.description}>{item.description}</div>
        )}
      </div>
      <div className={styles.delete} onClick={() => onDelete(item.id)}>
        <HiTrash />
      </div>
    </div>
  );
};

export default BacketItem;
