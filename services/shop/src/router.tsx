import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import React, { Suspense } from "react";
import { LazyShop } from "./components/shop/Shop.lazy";

const routes = [
  {
    path: "/shop",
    element: <App />,
    errorElement: <h1>ERRor, page not found</h1>,
    children: [
      {
        path: "/shop/main",
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyShop />
          </Suspense>
        ),
      },
      {
        path: "/shop/second",
        element: (
          <Suspense fallback={"Loading..."}>
            <h1>SECOND SHOP</h1>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
