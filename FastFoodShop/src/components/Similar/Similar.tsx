import styles from "./Similar.module.css";
import SimilarCard from "../UI/Similar/SimilarCard";
const similar = [
  {
    name: "McDonald's",
    image:
      "https://hipfonts.com/wp-content/uploads/2022/08/McDonalds-logo-cover.jpg",
  },
  {
    name: "Papa Johns",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNFV__cEUAv_b7IPApRNEh5ZtuZGH76uYGZd3V2ZrIaGR6mKlkCKJr89eaVpsXIr-WDw4&usqp=CAU",
  },
  {
    name: "KFC",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd9A7fyweRRRH9No4uOjjsnmtTshUJ25HGz_TI-PbnaHA5oU-iM_nhGTVU1gIQtsq_8PI&usqp=CAU",
  },
  {
    name: "Texas Chicken",
    image:
      "https://vectorseek.com/wp-content/uploads/2023/09/Texas-Chicken-Logo-Vector.svg-.png",
  },
  {
    name: "Burger King",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--1MJsy7_DWpEDHBVdc8L7Vn-neqF-M_MyA&s",
  },
  {
    name: "Shaurma 1",
    image: "https://shaurma1.com/wwwroot/assets/images/shaurma1.png",
  },
];

const Similar = () => {
  return (
    <div className={styles.similar}>
      <h2>Similar Restaurants</h2>
      <div className={styles.cards}>
        {similar.map((item) => (
          <SimilarCard key={item.name} name={item.name} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default Similar;
