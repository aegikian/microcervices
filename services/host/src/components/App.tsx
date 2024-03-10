import React from "react";
import "./main.scss";
import { Count } from "./Count";
import { Link, Outlet } from "react-router-dom";
import { adminRoutes, shopRoutes } from "@packages/shared/src/routes/index";

export const App = () => {
  return (
    <div>
      Hello World
      <div className="links">
        <Link to={adminRoutes.main}>Admin</Link>
        <Link to={shopRoutes.main}>Shop</Link>
        <Link to={adminRoutes.second}>admin sec</Link>
        <Link to={shopRoutes.second}>Shop sec</Link>
        <Link to={"/"}>Home</Link>
      </div>
      <Outlet />
    </div>
  );
};
