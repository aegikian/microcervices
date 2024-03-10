import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import React, { Suspense } from "react";
import { LazyAbout } from "./components/about/About.lazy";
import { LazyShop } from "./components/shop/Shop.lazy";

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
      {
        path: "/shop",
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyShop />
          </Suspense>
        ),
      },
    ],
  },
]);
