import styles from "./Map.module.css";

const Map = () => {
  return (
    <div className={styles.map}>
      <iframe
        title="Forum Lviv McDonald's"
        className={styles.mapIframe}
        src="https://www.google.com/maps?q=McDonald's,+Forum+Lviv,+Lviv,+Ukraine&hl=uk&z=16&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className={styles.mapInfo}>
        <strong style={{ fontSize: "20px" }}>McDonald’s</strong>
        <br />
        <strong style={{ color: "orange" }}>Forum Lviv</strong>
        <br />
        <br />
        Pid Dubom Street, 7b 79019 Lviv, Ukraine Third floor
        <br />
        <br />
        Phone number:
        <br />
        <span style={{ color: "orange" }}>+380 93 197 60 00</span>
        <br />
        Website:
        <br />
        <a
          href="https://mcdonalds.ua/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "orange" }}
        >
          mcdonalds.ua
        </a>
      </div>
    </div>
  );
};

export default Map;
