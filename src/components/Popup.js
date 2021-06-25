import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../css/popup.css";
function Popup() {
  const location = useLocation();
  const history = useHistory();

  const [tname, setTeacherName] = useState();
  const [heading, setHeading] = useState();
  const [info, setInfo] = useState();
  const [link, setLink] = useState();
  const month = location.state.month;
  const [date, setDate] = useState(
    location.state.date ? location.state.date : 0
  );
  const [startTime, setStartTime] = useState(
    location.state.startTime ? location.state.startTime : undefined
  );
  const [endTime, setEndTime] = useState(
    location.state.startTime ? location.state.startTime + 1 : undefined
  );
  const [teacher, setTeacher] = useState(0);
  const [allTeachersList, setAllTeachersList] = useState([]);

  // Using to update list of all teacher so that this new addition of teacher reflect inside options of teacher.
  const [addNewTeacherFlag, setAddNewTeacherFlag] = useState(0);

  const dates = [];
  for (var i = 1; i <= 30; i++) {
    dates.push(<option value={i}>{i}</option>);
  }

  const close = () => {
    history.goBack();
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
          setTeacherName("");
          alert("Teacher saved successfully");
          setAddNewTeacherFlag((prev) => {
            return !prev;
          });
        }
      });
  };

  const addnewEvent = () => {
    if (
      !heading ||
      !info ||
      !link ||
      !startTime ||
      !endTime ||
      !date ||
      !teacher
    ) {
      alert("Please fill out all the missing details");
    } else {
      fetch("https://vishesh-pep-calendar.herokuapp.com/addNewEvent", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tId: teacher,
          start: startTime,
          end: endTime,
          date,
          heading,
          info,
          link,
          month,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.err) {
            setHeading("");
            setInfo("");
            setLink("");
            alert(result.result);
          } else {
            alert(
              "Event already exist. Either change the teacher, start time, or month"
            );
          }
        });
    }
  };

  useEffect(() => {
    if (startTime) {
      setEndTime(Number(startTime) + 1);
    }
  }, [startTime]);

  useEffect(() => {
    fetch("https://vishesh-pep-calendar.herokuapp.com/getAllTeacher")
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const newList = [];
          for (var i = 0; i < result.teachers.length; i++) {
            newList.push(
              <option value={result.teachers[i].tId}>
                {result.teachers[i].tname}
              </option>
            );
          }
          setAllTeachersList(newList);
        }
      });
  }, [addNewTeacherFlag]);

  return (
    <div className="popup">
      <p
        style={{
          float: "right",
          color: "white",
          fontSize: "50px",
          marginRight: "100px",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onClick={() => close()}
      >
        &times;
      </p>
      <div className="popup_content">
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Heading"
          required
        />
        <input
          type="text"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com"
          pattern="https://.*"
          size="30"
          required
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <select
            style={{ margin: "8px" }}
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="navbar_dwm_dropdown"
          >
            <option value="0" disabled>
              {" "}
              select date
            </option>
            {dates}
          </select>
          <input
            type="number"
            value={startTime}
            min={1}
            max={23}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="start"
            required
          />
          <input
            type="number"
            value={endTime}
            min={Number(startTime) + 1}
            max={24}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="end"
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <select
            style={{ margin: "8px" }}
            name="teacher"
            id="teacher"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="navbar_dwm_dropdown"
          >
            <option value="0" disabled>
              select teacher
            </option>
            {allTeachersList.length ? (
              allTeachersList
            ) : (
              <option disabled>No teacher listed</option>
            )}
          </select>
          <button
            style={{ width: "100px", margin: "8px" }}
            onClick={() => addnewEvent()}
          >
            Add
          </button>
        </div>
        <div
          style={{
            marginTop: "100px",
            marginLeft: "8px",
            marginBottom: "8px",
          }}
        >
          <input
            type="text"
            value={tname}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Teacher name"
          />
          <button onClick={() => addNewTeacher()}>Add teacher</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
