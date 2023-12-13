import PropTypes from "prop-types";
import styles from "./Groups.module.css";
import { iconLetters } from "../../utils/iconLetter";

function Group({ ele,handleGroupClick }) {
  return (
    <button className={styles.groupWrapper} onClick={handleGroupClick} id={ele.groupId} >
      <div
        className={styles.groupIcon}
        style={{ backgroundColor: ele.backgroundColor }}
      >
        {iconLetters(ele.groupName)}
      </div>
      <h2 className={styles.groupName}>{ele.groupName}</h2>
    </button>
  );
}
Group.propTypes = {
  ele: PropTypes.object,
  handleGroupClick : PropTypes.func
};

export default function Groups({ handleClickPlus, groups,handleGroupClick }) {
  return (
    <section className={styles.wrapper}>
      <h1>NoTo</h1>
      <div className={styles.groupsList}>
        {groups.map((ele, index) => (
          <Group ele={ele} key={index} handleGroupClick={handleGroupClick} />
        ))}
      </div>
      <button className={styles.groupAddBtn} onClick={handleClickPlus}>
        +
      </button>
    </section>
  );
}

Groups.propTypes = {
  handleClickPlus: PropTypes.func,
  groups: PropTypes.array,
  handleGroupClick : PropTypes.func
};
