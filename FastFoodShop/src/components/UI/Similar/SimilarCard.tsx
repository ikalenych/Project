import styles from "./SimilarCard.module.css";
type SimilarType = {
  name: string;
  image: string;
};
const SimilarCard = ({ name, image }: SimilarType) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img className={styles.image} src={image} />
      </div>
      <div className={styles.name}> {name}</div>
    </div>
  );
};

export default SimilarCard;
