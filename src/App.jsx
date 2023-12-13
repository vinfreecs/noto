import styles from "./App.module.css";
import Groups from "./components/Groups/Groups";
import Landing from "./components/Landing/Landing";
import { useState } from "react";
import GroupCreateBox from "./components/Groups/GroupCreateBox";
import Notes from "./components/Notes/Notes";
import { v4 as uuid } from "uuid";

function App() {
  const dateTo = new Date();
  const [groups, setGroups] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [groupDetalis, setGroupDetails] = useState({
    groupName: "",
    backgroundColor: "blue",
  });
  const [openNotes, setOpenNotes] = useState(false);
  const [newNote, setNewNote] = useState({
    content: "",
    time: "",
    date: "",
  });
  const [currGroup, setCurrGroup] = useState();

  const uuidFromUuidV4 = () => {
    const newUuid = uuid();
    return newUuid;
  };

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
      setGroups([
        ...groups,
        { ...groupDetalis, groupId: uuidFromUuidV4(), notes: [] },
      ]);
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

  const handleGroupClick = (e) => {
    setOpenNotes(!openNotes);
    if(e.target.closest("button").id == currGroup.groupId){
      setOpenNotes(!openNotes);
    }else if((currGroup.groupId == null)||(currGroup.groupId != e.target.closest("button").id)){
      const theCurrGrp = groups.filter(
        (ele) => ele.groupId === e.target.closest("button").id
      );
      setCurrGroup({ ...theCurrGrp[0] });
      setOpenNotes(true);
    }else{
      setOpenNotes(!openNotes);
    }
  };

  const handleNoteSubmit = () => {
    setNewNote((prevState) => {
      let time = dateTo.toLocaleTimeString()
      let date = dateTo.toLocaleDateString() 
      return {
        ...prevState,
        time: time,
        date: date,
      };
    });
    console.log(newNote);
    setCurrGroup({
      ...currGroup,
      notes: [...currGroup.notes, newNote],
    });
    const index = groups.findIndex(ele => ele.groupId === currGroup.groupId)
    setGroups((prevState)=>{
      prevState[index].notes=[...prevState[index].notes,newNote]
      return (prevState)
    })
    setNewNote({
      content: "",
      time: "",
      date: "",
    })
    console.log(index)
  };

  const handleTextAreaChange = (e) => {
    setNewNote({ ...newNote, content: e.target.value });
  };

  return (
    <>
      <main className={styles.appWrapper}>
        <Groups
          handleClickPlus={handleClickPlus}
          groups={groups}
          handleGroupClick={handleGroupClick}
        />
        {openNotes ? (
          <Notes
            currGroup={currGroup}
            handleNoteSubmit={handleNoteSubmit}
            handleTextAreaChange={handleTextAreaChange}
            note={newNote}
          />
        ) : (
          <Landing />
        )}
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
