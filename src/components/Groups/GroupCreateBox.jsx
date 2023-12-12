import styles from "../../App.module.css";
import PropTypes from "prop-types";

function ColorBtn({ handleColorChange, color, highlight }) {
    return (
      <>
        {highlight ? (
          <button
            id={color}
            style={{ backgroundColor: color, border: "solid 2px black" }}
            onClick={handleColorChange}
          ></button>
        ) : (
          <button
            id={color}
            style={{ backgroundColor: color }}
            onClick={handleColorChange}
          ></button>
        )}
      </>
    );
  }
  ColorBtn.propTypes = {
    handleColorChange: PropTypes.func,
    color: PropTypes.string,
    highlight: PropTypes.bool
  };
  

export default function GroupCreateBox({
    handleChange,
    groupDetalis,
    handleColorChange,
    handleCreateSubmit,
  }) {
    const createColors = ["red", "yellow", "green", "blue", "orange", "pink"];
    return (
      <div className={styles.createGroupWrapper}>
        <div className={styles.createBox}>
          <p className={styles.title}>Create New Group</p>
          <div className={styles.inputName}>
            <span>Group Name</span>
            <input
              type="text"
              name="groupName"
              id="groupName"
              placeholder="Enter group name"
              onChange={handleChange}
              value={groupDetalis.groupName}
            />
          </div>
          <div className={styles.inputColor}>
            <span>Choose colour</span>
            {createColors.map((ele, index) => (
              <ColorBtn
                key={index}
                color={ele}
                handleColorChange={handleColorChange}
                highlight={groupDetalis.backgroundColor === ele}
              />
            ))}
          </div>
          <button className={styles.createBtn} onClick={handleCreateSubmit}>
            Create
          </button>
        </div>
      </div>
    );
  }
  GroupCreateBox.propTypes = {
    handleChange: PropTypes.func,
    handleColorChange: PropTypes.func,
    handleCreateSubmit: PropTypes.func,
    groupDetalis: PropTypes.object,
  };