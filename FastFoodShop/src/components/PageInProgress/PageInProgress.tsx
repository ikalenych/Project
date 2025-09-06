import { Link, useParams } from "react-router-dom";
import styles from "./PageInProgress.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const PageInProgress = () => {
  const { pageName } = useParams();
  const formattedPageName = pageName
    ? pageName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Unknown Page";

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <p className={styles.message}>
          Hello, this page "{formattedPageName}" is in progress
        </p>
        <Link to="/">
          <button className={styles.backButton}>Back to Home</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default PageInProgress;
