import React from "react";
import "./main.scss";
import { Count } from "./Count";
import { Link, Outlet } from "react-router-dom";
export const App = () => {
  return (
    <div>
      Hello World
      <div className="links">
        <Link to={"/about"}>About</Link>
        <Link to={"/shop"}>Shop</Link>
        <Link to={"/"}>Home</Link>
      </div>
      <Count />
      <Outlet />
    </div>
  );
};
