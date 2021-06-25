import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../css/menu.css";
import { UserContext } from "../App";

function Menu() {
  const [tname, setTeacher] = useState();
  const [allTeachersList, setAllTeachersList] = useState([]);

  // Using to update list of all teacher so that this new addition of teacher reflect inside options of teacher.
  const [addNewTeacherFlag, setAddNewTeacherFlag] = useState(0);
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const createEvent = () => {
    history.push({
      pathname: "/addEvent",
      state: { month: state.month },
    });
  };

  const addNewTeacher = () => {
    fetch("https://vishesh-pep-calendar.herokuapp.com/addNewTeacher", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tname,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.err) {
          setTeacher("");
          setAddNewTeacherFlag((prev) => {
            return !prev;
          });
          alert("Teacher saved successfully");
        }
      });
  };

  useEffect(() => {
    fetch("https://vishesh-pep-calendar.herokuapp.com/getAllTeacher")
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const newList = [];
          for (var i = 0; i < result.teachers.length; i++) {
            newList.push(
              <li id={result.teachers[i].tId}>{result.teachers[i].tname}</li>
            );
          }
          setAllTeachersList(newList);
        }
      });
  }, [addNewTeacherFlag]);

  return (
    <div className="menu">
      <button onClick={() => createEvent()}>Create</button>
      <h2>Teachers</h2>
      <div className="teachers">
        {allTeachersList.length ? (
          allTeachersList
        ) : (
          <h6 style={{ color: "red" }}>No teachers exist yet!</h6>
        )}
      </div>
      <div>
        <input
          type="text"
          value={tname}
          onChange={(e) => setTeacher(e.target.value)}
          placeholder="Teacher name"
        />
        <button onClick={() => addNewTeacher()}>Add teacher</button>
      </div>
    </div>
  );
}

export default Menu;
