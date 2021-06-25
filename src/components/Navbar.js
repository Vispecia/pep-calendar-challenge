import React, { useState, useContext } from "react";
import "../css/navbar.css";
import { UserContext } from "../App";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const [month, setMonth] = useState(state.month);
  const [dwm, setDWM] = useState(state.filter);

  const changeMonth = (e) => {
    dispatch({
      type: "UPDATE_MONTH",
      payload: {
        month: e.target.value,
      },
    });
    setMonth(e.target.value);
  };
  const changeFilter = (e) => {
    dispatch({
      type: "UPDATE_FILTER",
      payload: {
        filter: e.target.value,
      },
    });
    setDWM(e.target.value);
  };

  return (
    <div className="navbar">
      <select
        name="month"
        id="month"
        value={month}
        onChange={(e) => changeMonth(e)}
        className="navbar_dwm_dropdown"
      >
        <option value="JAN">JAN</option>
        <option value="FEB">FEB</option>
        <option value="MAR">MAR</option>
        <option value="APR">APR</option>
        <option value="MAY">MAY</option>
        <option value="JUN">JUN</option>
        <option value="JUL">JUL</option>
        <option value="AUG">AUG</option>
        <option value="SEP">SEP</option>
        <option value="OCT">OCT</option>
        <option value="NOV">NOV</option>
        <option value="DEC">DEC</option>
      </select>

      <select
        name="dwm"
        id="dwm"
        value={dwm}
        onChange={(e) => changeFilter(e)}
        className="navbar_dwm_dropdown"
      >
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
    </div>
  );
}

export default Navbar;
