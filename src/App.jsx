import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import NavBar from "./NavBar";

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar></NavBar>
        <Switch>
          <Route path="/" exact>
            Inicio...
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/admin">
            admin...
          </Route>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
