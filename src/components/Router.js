import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../routes/Home";
import EditProfile from "../routes/EditProfile";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";

function useRouter() {
  const [isLogin, setIsLogin] = useState(false);
  const newRouter = createBrowserRouter([
    {
      path: `${process.env.PUBLIC_URL + "/"}`,
      element: isLogin ? <Home /> : <Auth />,
    },
    {
      path: `${process.env.PUBLIC_URL + "/edit-profile"}`,
      element: <EditProfile />,
    },
    {
      path: `${process.env.PUBLIC_URL + "/profile"}`,
      element: <Profile />,
    },
  ]);
  return newRouter;
}

function Router() {
  const router = useRouter();
  return <RouterProvider router={router} />;
}

export default Router;
