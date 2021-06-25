import React from "react";
import { useHistory } from "react-router-dom";
import "../css/cell.css";

function Cell({ date, weekday, month, width }) {
  const time = [];
  const history = useHistory();

  const createEvent = (startTime) => {
    history.push({ pathname: "/addEvent", state: { startTime, date, month } });
  };

  const getEventInfoFromDateAndTime = (startTime) => {
    fetch("https://vishesh-pep-calendar.herokuapp.com/getEventAt", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: startTime,
        date,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.length) {
          history.push({
            pathname: "/eventInfo",
            state: { info: result, start: startTime, date },
          });
        } else {
          alert("No event exist yet");
        }
      });
  };

  for (let i = 1; i <= 24; i++) {
    if (i < 12)
      time.push(
        <div className="cell_time">
          <p>{`${i} AM`}</p>
          <div className="cell_button">
            <button onClick={() => createEvent(i)}>Add</button>
            <button onClick={() => getEventInfoFromDateAndTime(i)}>Info</button>
          </div>
        </div>
      );
    else if (i >= 12 && i < 24)
      time.push(
        <div className="cell_time">
          <p>{`${i} PM`}</p>
          <div className="cell_button">
            <button onClick={() => createEvent(i)}>Add</button>
            <button onClick={() => getEventInfoFromDateAndTime(i)}>Info</button>
          </div>
        </div>
      );
    else
      time.push(
        <div className="cell_time">
          <p>{`${i} AM`}</p>
          <div className="cell_button">
            <button onClick={() => createEvent(i)}>Add</button>
            <button onClick={() => getEventInfoFromDateAndTime(i)}>Info</button>
          </div>
        </div>
      );
  }

  return (
    <div className="cell" style={{ minWidth: `${width}%` }}>
      <div className="cell_date">
        <h3>{weekday}</h3>
        <h4>{date}</h4>
      </div>
      <div className="times">{time}</div>
    </div>
  );
}

export default Cell;
