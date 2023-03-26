import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  HashRouter,
} from "react-router-dom";
import App from "./App";
import Home from "../routes/Home";
import EditProfile from "../routes/EditProfile";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";

function useRouter() {
  const newRouter = createBrowserRouter(
    [
      {
        path: `/`,
        element: <App />,
        children: [
          {
            path: `/`,
            element: <Home />,
          },
          {
            path: "/auth",
            element: <Auth />,
          },
          {
            path: "/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
    {
      basename: process.env.PUBLIC_URL,
    }
  );
  return newRouter;
}

function Router() {
  const router = useRouter();
  return <RouterProvider router={router} />;
}

export default Router;
