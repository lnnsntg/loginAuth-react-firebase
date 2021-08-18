import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-success mt-1">
      
      <Link className="navbar-brand ms-3" to="/">Auth</Link>
      <div>
        <div className="d-flex">
           <NavLink className="btn btn-dark me-2" to="/" exact>
               Inicio
            </NavLink> 
            <NavLink className="btn btn-dark me-2" to="/admin" exact>
                Admin
            </NavLink>

            <NavLink className="btn btn-dark me-2" to="/login" exact>
                Login
            </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
