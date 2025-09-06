import styles from "./Food.module.css";
import { useState, useEffect } from "react";
import Item from "../../UI/FoodItem/Item";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

interface Size {
  name: string;
  price: number;
}

interface MenuItem {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  productType: string;
  sizes: Size[];
  defaultSize: number;
}

interface FoodProps {
  activeCategory: string;
  searchTerm: string;
}

const Food: React.FC<FoodProps> = ({ activeCategory, searchTerm }) => {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [sortType, setSortType] = useState<"name" | "price">("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ ...(doc.data() as MenuItem), id: doc.id });
      });
      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredByCategory = products.filter(
    (item) => item.productType === activeCategory
  );

  const filteredData = filteredByCategory.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortType === "name") {
      return a.title.localeCompare(b.title);
    } else {
      return a.sizes[a.defaultSize].price - b.sizes[b.defaultSize].price;
    }
  });

  if (loading) return <p className={styles.empty}>Loading products...</p>;

  return (
    <div className={styles.food}>
      <div className={styles.header}>
        <h2>{activeCategory}</h2>
        <label className={styles.sort}>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as "name" | "price")}
          >
            <option value="name">Sort by name</option>
            <option value="price">Sort by pricing</option>
          </select>
        </label>
      </div>

      <div className={styles.items}>
        {sortedData.length > 0 ? (
          sortedData.map((product) => <Item key={product.id} {...product} />)
        ) : (
          <p className={styles.empty}>No items found in this category</p>
        )}
      </div>
    </div>
  );
};

export default Food;
