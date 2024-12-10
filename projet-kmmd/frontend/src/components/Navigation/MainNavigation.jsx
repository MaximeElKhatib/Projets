import React from "react";
import { Outlet } from "react-router-dom";
import NavLinks from "./NavLinks";

const MainNavigation = () => {
  return (
    <div>
      <header>
        <NavLinks />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainNavigation;
