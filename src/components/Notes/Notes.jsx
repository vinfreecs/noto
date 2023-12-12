import styles from "./Notes.module.css";

export default function Notes() {
  return (
    <section className={styles.notesWrapper}>
      <header className={styles.header}>
        <div className={styles.icon}>MN</div>
        <p>My Notes</p>
      </header>
      <div className={styles.notesBox}>
        <div className={styles.noteWrapper}>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sit
            consequatur eaque minus impedit asperiores eveniet ex at sapiente
            omnis, molestias aut, facere aspernatur in amet commodi ullam itaque
            repudiandae.
          </div>
          <div className={styles.timepatch}>
            <span>12-12-2023</span>
            {/* <span style={{fontSize:"3rem"}}>.</span> */}
            <span>21:47</span>
          </div>
        </div>
      </div>
      <div className={styles.noteInput}>
        <textarea name="content" id="content"></textarea>
        <button className={styles.submitNote}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="29"
            viewBox="0 0 35 29"
            fill="none"
          >
            <path
              d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z"
              fill="#ABABAB"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
