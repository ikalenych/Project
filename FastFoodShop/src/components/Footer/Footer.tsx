import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.higherFooter}>
          <div className={styles.logo}>
            <img
              src="logo.svg"
              alt="FastFoodShop Logo"
              className={styles.logoImage}
            />
            <br />

            <a
              href="https://apps.apple.com/app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width="150"
              />
            </a>

            <a
              href="https://play.google.com/store/apps/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                alt="Get it on Google Play"
                width="170"
              />
            </a>

            <p>
              Company # 490039-445, Registered with <br />
              House of companies.
            </p>
          </div>
          <div className={styles.socials}>
            <h3>Get Exclusive Deals in your Inbox</h3>
            <div className={styles.input}>
              <input type="email" placeholder="youremail@gmail.com" />
              <button>Subscribe</button>
              <p>we wont spam, read our email policy</p>
            </div>

            <div className={styles.socialIcons}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.snapchat.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSnapchat />
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.leftSide}>
              <h3>Legal Pages</h3>
              <Link to="/terms-and-conditions">Terms and conditions</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/cookies">Cookies</Link>
              <Link to="/modern-slavery-statement">
                Modern Slavery Statement
              </Link>
            </div>
            <div className={styles.rightSide}>
              <h3>Important Links</h3>
              <Link to="/get-help">Get Help</Link>
              <Link to="/add-your-restaurant">Add your restaurant</Link>
              <Link to="/sign-up-to-deliver">Sign up to deliver</Link>
              <Link to="/create-a-business-account">
                Create a business account
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.lowerFooter}>
          <p>Order.uk Copyright 2024, All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
