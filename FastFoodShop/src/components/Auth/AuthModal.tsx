import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { loginUser, registerUser } from "../../firebaseUserApi";
import styles from "./AuthModal.module.css";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (nickname.length > 10) {
      setError("Nickname must be 10 characters or less");
      return;
    }
    if (password.length < 8) {
      setError("Password must be 8 characters or more");
      return;
    }
    try {
      let userData;
      if (isRegister) {
        userData = await registerUser(nickname, password);
      } else {
        userData = await loginUser(nickname, password);
      }
      dispatch(login(userData));
      setNickname("");
      setPassword("");
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isRegister ? "Sign Up" : "Login"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className={styles.switchText}>
          {isRegister ? "Already have an account?" : "No account?"}{" "}
          <span
            className={styles.switch}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
