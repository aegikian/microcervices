import React from "react";
import "./main.scss";
import { Count } from "./Count";
import { Link, Outlet } from "react-router-dom";
import { sum } from "@packages/shared";
export const App = () => {
  const q = sum(1, 4);
  return (
    <div>
      ADMIN MODULE
      <Count />
      <Outlet />
    </div>
  );
};
