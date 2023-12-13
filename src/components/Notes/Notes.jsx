import styles from "./Notes.module.css";
import PropTypes from "prop-types";
import { iconLetters } from "../../utils/iconLetter";

function Note({ ele }) {
  return (
    <div className={styles.noteWrapper}>
      <div className={styles.content}>{ele.content}</div>
      <div className={styles.timepatch}>
        <span>{ele.date}</span>
        {/* <span style={{fontSize:"3rem"}}>.</span> */}
        <span>{ele.time}</span>
      </div>
    </div>
  );
}
Note.propTypes = {
  ele: PropTypes.object,
};

export default function Notes({
  currGroup,
  handleNoteSubmit,
  handleTextAreaChange,
  note,
}) {
  return (
    <section className={styles.notesWrapper}>
      <header className={styles.header}>
        <div className={styles.icon}>{iconLetters(currGroup.groupName)}</div>
        <p>{currGroup.groupName}</p>
      </header>
      <div className={styles.notesBox}>
        {currGroup.notes.map((ele, index) => (
          <Note key={index} ele={ele} />
        ))}
      </div>
      <div className={styles.noteInput}>
        <textarea
          name="content"
          id="content"
          value={note.content}
          onChange={handleTextAreaChange}
        ></textarea>
        <button className={styles.submitNote} onClick={handleNoteSubmit}>
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
Notes.propTypes = {
  currGroup: PropTypes.object,
  handleNoteSubmit: PropTypes.func,
  handleTextAreaChange: PropTypes.func,
  note: PropTypes.object,
};
