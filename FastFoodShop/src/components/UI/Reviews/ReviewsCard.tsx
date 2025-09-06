import React from "react";
import styles from "./ReviewCard.module.css";

type ReviewProps = {
  name: string;
  location: string;
  date: string;
  rating: number;
  reviewText: string;
  avatar: string;
};

const ReviewCard: React.FC<ReviewProps> = ({
  name,
  location,
  date,
  rating,
  reviewText,
  avatar,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            <img src={avatar} alt={name} className={styles.avatar} />
          </div>
          <span
            style={{ width: "2px", height: "35px", backgroundColor: "#FC8A06" }}
          />
          <div>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.location}>{location}</p>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.stars}>
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </div>
          <p className={styles.date}>{date}</p>
        </div>
      </div>

      <p className={styles.text}>{reviewText}</p>
    </div>
  );
};

export default ReviewCard;
