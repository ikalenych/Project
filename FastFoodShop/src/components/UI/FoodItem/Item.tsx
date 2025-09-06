import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/cartSlice";
import styles from "./Item.module.css";

interface ItemProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  productType: string;
  sizes: { name: string; price: number }[];
  defaultSize: number;
}

const Item: React.FC<ItemProps> = ({
  id,
  title,
  description,
  image,
  rating,
  sizes,
  defaultSize,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(defaultSize);
  const dispatch = useDispatch();

  const renderRating = () =>
    rating
      ? Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`${styles.pepper} ${i < rating ? styles.active : ""}`}
          >
            🌶
          </span>
        ))
      : null;

  const handleAddToCart = () => {
    const size = sizes[selectedSizeIndex];
    dispatch(
      addItem({
        id: `${id}_${size.name}`,
        name: `${title} (${size.name})`,
        price: size.price,
        quantity: 1,
        description,
      })
    );
  };

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          {rating !== undefined && (
            <div className={styles.rating}>{renderRating()}</div>
          )}
          <p className={styles.description}>{description}</p>

          <div className={styles.sizes}>
            {sizes.map((size, index) => (
              <button
                key={size.name}
                className={`${styles.sizeButton} ${
                  selectedSizeIndex === index ? styles.selected : ""
                }`}
                onClick={() => setSelectedSizeIndex(index)}
              >
                <span className={styles.sizeName}>{size.name}</span>
                <span className={styles.sizePrice}>£{size.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
        </div>
      </div>

      <button className={styles.addToCart} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default Item;
