import React from "react";
import styles from "./InformationSection.module.css";

const textInfo = (
  <>
    <p>
      <strong>Monday:</strong> 12:00 AM–3:00 AM
    </p>
    <p>
      <strong>Tuesday:</strong> 8:00 AM–3:00 AM
    </p>
    <p>
      <strong>Wednesday:</strong> 8:00 AM–3:00 AM
    </p>
    <p>
      <strong>Thursday:</strong> 8:00 AM–3:00 AM
    </p>
    <p>
      <strong>Friday:</strong> 8:00 AM–3:00 AM
    </p>
    <p>
      <strong>Saturday:</strong> 8:00 AM–3:00 AM
    </p>
    <p>
      <strong>Sunday:</strong> 8:00 AM–12:00 AM
    </p>
    <p>
      <strong>Estimated time until delivery:</strong> 20 min
    </p>
  </>
);

const InfoCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.column}>
        <h3>
          <img src="Tracking.svg" alt="Delivery icon" />
          Delivery information
        </h3>
        {textInfo}
      </div>

      <div className={styles.column}>
        <h3>
          <img src="Contact.svg" alt="Contact icon" />
          Contact information
        </h3>
        <p style={{ lineHeight: "2.5", fontSize: "18px" }}>
          If you have allergies or other dietary
          <br /> restrictions, please contact the restaurant. The
          <br /> restaurant will provide food-specific
          <br /> information upon request.
        </p>
        <p>
          <strong>Phone number</strong>
        </p>
        <p style={{ marginBottom: "12px", fontSize: "18px" }}>+934443-43</p>
        <p>
          <strong>Website</strong>
        </p>
        <p>
          <a
            href="http://mcdonalds.uk/"
            style={{
              marginBottom: "12px",
              fontSize: "18px",
              color: "black",
              textDecoration: "none",
            }}
          >
            http://mcdonalds.uk/
          </a>
        </p>
      </div>

      <div className={`${styles.column} ${styles.columnDark}`}>
        <h3>
          <img src="Clock.svg" alt="Clock icon" />
          Operational Times
        </h3>

        {textInfo}
      </div>
    </div>
  );
};

export default InfoCard;
