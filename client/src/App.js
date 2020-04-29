import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
import Nav from "./components/Nav";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import NoMatch from "./pages/NoMatch";
import Categories from "./pages/Categories";
import "./App.css";

console.log(process.env.REACT_APP_MY_TEST_VARIABLE);

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/", "/signin"]}>
            <Signin />
          </Route>
          <Route exact path={"/signup"}>
            <Signup />
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard />
          </Route>
          <Route exact path={"/account"}>
            <Account />
          </Route>
          <Route exact path={"/categories"}>
            <Categories />
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
