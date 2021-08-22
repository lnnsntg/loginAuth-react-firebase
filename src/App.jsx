import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Admin";
import { auth } from "./firebase";
import Login from "./Login";
import NavBar from "./NavBar";
import Reset from "./Reset";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <NavBar firebaseUser={firebaseUser}></NavBar>
        <Switch>
          <Route path="/" exact>
            Inicio...
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/admin">
            <Admin></Admin>
          </Route>

          <Route path="/passreset">
            <Reset></Reset>
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  );
}

export default App;
