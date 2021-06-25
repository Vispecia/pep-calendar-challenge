import React from "react";
import { useLocation } from "react-router-dom";
import "../css/eventinfo.css";

function EventInfo() {
  const location = useLocation();
  const info = location.state.info ? location.state.info : undefined;
  const start = location.state.start;
  const date = location.state.date;

  return (
    <div>
      {info ? (
        <div>
          <div style={{ textAlign: "center" }}>
            <h1>
              Events on Date: {date} which starts at:{" "}
              {`${start} ${start < 12 || start === 24 ? "AM" : "PM"}`}
            </h1>
          </div>
          {info.map((event) => {
            return (
              <div className="info">
                <h3>{event.tname}</h3>
                <p>{event.ehead}</p>
                <p>{event.einfo}</p>
                <a href={event.elink}> meeting link </a>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default EventInfo;
