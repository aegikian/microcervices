import React from "react";
import "./main.scss";
import { Count } from "./Count";
import { Link, Outlet } from "react-router-dom";
import { sum } from "@packages/shared";
export const App = () => {
  const q = sum(1, 4);
  return (
    <div>
      Hello World
      <div className="links">
        <Link to={"/about"}>About</Link>
        <Link to={"/shop"}>Shop</Link>
        <Link to={"/"}>Home</Link>
      </div>
      <div>{q}</div>
      <Count />
      <Outlet />
    </div>
  );
};
