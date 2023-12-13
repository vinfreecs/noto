import styles from "./App.module.css";
import Groups from "./components/Groups/Groups";
import Landing from "./components/Landing/Landing";
import { useEffect, useState } from "react";
import GroupCreateBox from "./components/Groups/GroupCreateBox";
import Notes from "./components/Notes/Notes";
import { v4 as uuid } from "uuid";

function getWindowWidth() {
  const innerWidth = window.innerWidth;
  return innerWidth;
}

function App() {
  const [screenWidth, setScreenWidth] = useState(getWindowWidth());
  useEffect(() => {
    function handleWindowResize() {
      setScreenWidth(getWindowWidth());
    }
    console.log(screenWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const dateTo = new Date();
  const [currDate, setCurrDate] = useState(dateTo.toDateString());
  const [currTime, setCurrTime] = useState(dateTo.toLocaleTimeString());
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem("data"))||[]);
  const [openCreate, setOpenCreate] = useState(false);
  const [groupDetalis, setGroupDetails] = useState({
    groupName: "",
    backgroundColor: "blue",
  });
  const [openNotes, setOpenNotes] = useState(false);
  const [newNote, setNewNote] = useState({
    content: "",
    time: currTime,
    date: currDate,
  });
  const [currGroup, setCurrGroup] = useState({
    groupName: "",
    backgroundColor: "blue",
    grouId: "",
  });

  const uuidFromUuidV4 = () => {
    const newUuid = uuid();
    return newUuid;
  };
  useEffect(()=>{
    localStorage.setItem("data",JSON.stringify(groups))
  },[groups])

  
  const handleClickPlus = () => {
    setOpenCreate(true);
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 15)
      setGroupDetails({ ...groupDetalis, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setGroupDetails({ ...groupDetalis, backgroundColor: e.target.id });
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
    if (e.target.closest("button").id == currGroup.groupId) {
      setOpenNotes(!openNotes);
    } else if (
      currGroup.groupId == "" ||
      currGroup.groupId != e.target.closest("button").id
    ) {
      const theCurrGrp = groups.filter(
        (ele) => ele.groupId === e.target.closest("button").id
      );
      setCurrGroup({ ...theCurrGrp[0] });
      setOpenNotes(true);
    } else {
      setOpenNotes(!openNotes);
    }
  };

  //fix the delay in time
  const handleNoteSubmit = () => {
    if (newNote.content.trim() != "") {
      setCurrGroup({
        ...currGroup,
        notes: [...currGroup.notes, newNote],
      });
      const index = groups.findIndex(
        (ele) => ele.groupId === currGroup.groupId
      );
      setGroups((prevState) => {
        const newState = [...prevState];
        const prevNotes = newState[index].notes;
        newState[index] = {
          ...newState[index],
          notes: [...prevNotes, newNote],
        };
        return newState;
      });
      setNewNote({
        content: "",
        time: currTime,
        date: currDate,
      });
    } else {
      alert("cant be empty");
    }
  };

  //enter in textarea not reflecting
  const handleTextAreaChange = (e) => {
    setCurrDate(dateTo.toDateString());
    setCurrTime(dateTo.toLocaleTimeString());
    setNewNote({ time: currTime, date: currDate, content: e.target.value });
  };

  const handleBackBtn = () =>{
    setOpenNotes(false)
  }

  return (
    <>
      <main className={styles.appWrapper}>
        {screenWidth > 800 ? (
          <Groups
            handleClickPlus={handleClickPlus}
            groups={groups}
            handleGroupClick={handleGroupClick}
            openNotes={openNotes}
              screenWidth={openNotes}
          />
        ) : (
          !openNotes && (
            <Groups
              handleClickPlus={handleClickPlus}
              groups={groups}
              handleGroupClick={handleGroupClick}
              openNotes={openNotes}
              screenWidth={openNotes}
            />
          )
        )}
        {screenWidth > 800 ? (
          openNotes ? (
            <Notes
              currGroup={currGroup}
              handleNoteSubmit={handleNoteSubmit}
              handleTextAreaChange={handleTextAreaChange}
              note={newNote}
              openCreate={openNotes}
              screenWidth={screenWidth}
              handleBackBtn={handleBackBtn}
            />
          ) : (
            <Landing />
          )
        ) : (
          openNotes && (
            <Notes
              currGroup={currGroup}
              handleNoteSubmit={handleNoteSubmit}
              handleTextAreaChange={handleTextAreaChange}
              note={newNote}
              openCreate={openNotes}
              screenWidth={screenWidth}
              handleBackBtn={handleBackBtn}
            />
          )
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
