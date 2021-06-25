import React, { useContext } from "react";
import Cell from "./Cell";
import "../css/calendar.css";
import { UserContext } from "../App";

function Calendar({ month }) {
  const { state, dispatch } = useContext(UserContext);
  return (
    <div className="calendar">
      {
        /* Month view */
        state.filter === "month"
          ? month.map((day) => {
              return (
                <Cell
                  date={day.date}
                  weekday={day.weekday}
                  month={state.month}
                  width="30"
                />
              );
            })
          : state.filter === "week"
          ? month.map((day) => {
              return (
                <Cell
                  date={day.date}
                  weekday={day.weekday}
                  month={state.month}
                  width="12.5"
                />
              );
            })
          : month.map((day) => {
              return (
                <Cell
                  date={day.date}
                  weekday={day.weekday}
                  month={state.month}
                  width="98"
                />
              );
            })
      }
    </div>
  );
}

export default Calendar;
