import React, { useContext } from "react";
import "./NavLinks.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

export default function NavLinks(props) {
  const auth = useContext(AuthContext);
  let navigate = useNavigate();

  function handleLogout() {
    auth.logout();
    navigate("/auth", { replace: true });
  }

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && <button onClick={handleLogout}>LOGOUT</button>}
    </ul>
  );
}
