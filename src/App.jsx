import styles from "./App.module.css";
import Groups from "./components/Groups/Groups";
import Landing from "./components/Landing/Landing";
import { useState } from "react";
import GroupCreateBox from "./components/Groups/GroupCreateBox";
import Notes from "./components/Notes/Notes";

function App() {
  const [groups, setGroups] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [groupDetalis, setGroupDetails] = useState({
    groupName: "",
    backgroundColor: "blue",
  });
  const [openNotes,setOpenNotes] = useState(false);
  const [newNote,setNewNote] = useState({
    content:"",
    time:"",
    date:""
  })

  const handleClickPlus = () => {
    setOpenCreate(true);
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 15)
      setGroupDetails({ ...groupDetalis, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setGroupDetails({ ...groupDetalis, backgroundColor: e.target.id });
    console.log(e.target);
    e.target;
  };

  const handleCreateSubmit = () => {
    if (groupDetalis.groupName != "") {
      setGroups([...groups, {...groupDetalis,notes:[]}]);
      setGroupDetails({
        groupName: "",
        backgroundColor: "blue",
      });
      setOpenCreate(false);
      console.log(groups);
    } else {
      //deal with this diffently
      alert("con't be empty");
    }
  };

  const handleGroupClick = () =>{
    setOpenNotes(!openNotes)
  }

  return (
    <>
      <main className={styles.appWrapper}>
        <Groups handleClickPlus={handleClickPlus} groups={groups} handleGroupClick={handleGroupClick} />
        {openNotes? 
          <Notes/>
        :<Landing />}
        {openCreate && (
          <GroupCreateBox
            handleChange={handleChange}
            groupDetalis={groupDetalis}
            handleColorChange={handleColorChange}
            handleCreateSubmit={handleCreateSubmit}
          />
        )}
      </main>
    </>
  );
}

export default App;
