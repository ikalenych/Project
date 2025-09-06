import styles from "./RestaurantCard.module.css";

const RestaurantCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        <p className={styles.time}>
          <img src="Clock.svg" />
          Open Until 3:00pm
        </p>
        <h3>Desi Flavours with a blend of Italian aesthetics!</h3>
        <div className={styles.info}>
          <p>
            <img src="Order.svg" />
            Minimum Order: 12 GBP
          </p>
          <p>
            <img src="Motocross.svg" />
            Delivery in 20-25 Minutes
          </p>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.image}>
          <img src="imagewoman.svg"></img>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
