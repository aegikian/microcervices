import { RouteObject, createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import React, { Suspense } from "react";
import shopRoutes from "shop/Router";
import adminRoutes from "admin/Router";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [...shopRoutes, ...adminRoutes],
    errorElement: <h1>ERRor, page not found</h1>,
  },
];

export const router = createBrowserRouter(routes);

export default routes;
