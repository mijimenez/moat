import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
import Nav from "./components/Nav";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={"/"}>
            {/* <Home/> */}
          </Route>
          <Route exact path={"/signin"}>
            <Signin />
          </Route>
          <Route exact path={"/signup"}>
            <Signup />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
