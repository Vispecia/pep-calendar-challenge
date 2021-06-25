import React, { useReducer, createContext } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Popup from "./components/Popup";
import EventInfo from "./components/EventInfo";
import { iState, reducer } from "./reducers/userReducer";
import "./App.css";

export const UserContext = createContext();

const Routing = () => {
  const month = [];
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  for (var i = 1; i <= 30; i++) {
    month.push({
      date: i,
      weekday: weekdays[i % 7],
    });
  }
  return (
    <Switch>
      <Route path="/addEvent" component={Popup} exact />
      <Route path="/eventInfo" component={EventInfo} exact />
      <Route path="/" exact>
        <div>
          <Navbar />
          <div className="App">
            <Menu />
            <Calendar month={month} />
          </div>
        </div>
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, iState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
