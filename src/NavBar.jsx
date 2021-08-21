import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { auth } from "./firebase";

const NavBar = (props) => {
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      props.history.push("/login");
    });
  };

  return (
    <nav className="navbar navbar-dark bg-success mt-1 rounded">
      <Link className="navbar-brand ms-3" to="/">
        Auth
      </Link>
      <div>
        <div className="d-flex">
          <NavLink className="btn btn-dark me-2" to="/" exact>
            Inicio
          </NavLink>
          {
          props.firebaseUser !== null ? (
            <NavLink className="btn btn-dark me-2" to="/admin" exact>
              Admin
            </NavLink>
          ) : null
          }

          {props.firebaseUser !== null ? (
            <button
              onClick={() => cerrarSesion()}
              className="btn btn-dark me-2"
            >
              Cerrar Sesión
            </button>
          ) : (
            <NavLink className="btn btn-dark me-2" to="/login" exact>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
