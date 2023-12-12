import styles from "./Landing.module.css";
import lock from "../../assets/lock.svg";

export default function Landing() {
  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.bg}></div>
        <p className={styles.title}>NoTo</p>
        <p className={styles.info}>
          Send and receive messages without keeping your phone online. <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
        <footer className={styles.footer}>
          <img src={lock} alt="lock" />
          <p>end-to-end encrypted</p>
        </footer>
      </section>
    </>
  );
}
