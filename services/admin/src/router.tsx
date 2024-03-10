import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import React, { Suspense } from "react";
import { LazyAbout } from "./components/about/About.lazy";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>ERRor, page not found</h1>,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyAbout />
          </Suspense>
        ),
      },
    ],
  },
]);
