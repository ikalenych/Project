import React, { useState, useEffect } from "react";
import styles from "./Reviews.module.css";
import ReviewCard from "../UI/Reviews/ReviewsCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface Review {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  reviewText: string;
  avatar: string;
}

const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxVisible, setMaxVisible] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newMaxVisible = 3;
      if (width < 769) newMaxVisible = 1;
      else if (width < 1158) newMaxVisible = 2;
      setMaxVisible((prev) => (prev !== newMaxVisible ? newMaxVisible : prev));

      setCurrentIndex((prev) => (prev !== 0 ? 0 : prev));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const fetchedReviews: Review[] = [];
      querySnapshot.forEach((doc) => {
        fetchedReviews.push({ ...(doc.data() as Review), id: doc.id });
      });
      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, []);

  const averageRating = Math.round(
    reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length || 0
  );

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < reviews.length - maxVisible;

  const handlePrev = () => {
    if (canPrev) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (canNext) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={styles.reviewsSection}>
      <div className={styles.header}>
        <h2>Customer Reviews</h2>
        <div className={styles.averageRating}>
          <p style={{ fontSize: "1.5rem" }}>{averageRating}</p>
          <div className={styles.stars}>
            {"★".repeat(averageRating)}
            {"☆".repeat(5 - averageRating)}
          </div>
          <p style={{ color: "#706f6fff" }}>{reviews.length} reviews</p>
        </div>
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={handlePrev}
            disabled={!canPrev}
          >
            <span>‹</span>
          </button>
          <button
            className={styles.navButton}
            onClick={handleNext}
            disabled={!canNext}
          >
            <span>›</span>
          </button>
        </div>
      </div>

      <div className={styles.reviewsGrid}>
        {reviews
          .slice(currentIndex, currentIndex + maxVisible)
          .map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
