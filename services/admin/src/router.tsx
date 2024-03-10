import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import React, { Suspense } from "react";
import { LazyAbout } from "./components/about/About.lazy";

const routes = [
  {
    path: "/admin",
    element: <App />,
    errorElement: <h1>ERRor, page not found</h1>,
    children: [
      {
        path: "/admin/main",
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: "/admin/second",
        element: (
          <Suspense fallback={"Loading..."}>
            <h1>SECOND ADMIN</h1>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
