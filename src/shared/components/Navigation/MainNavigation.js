import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

export default function MainNavigation(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDrawer() {
    setIsOpen((prevState) => {
      return !prevState;
    });
  }

  return (
    <>
      {isOpen && <Backdrop onClick={toggleDrawer} />}
      {isOpen && (
        <SideDrawer show={toggleDrawer} onClick={toggleDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={toggleDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">National Park Wanderlust</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}
