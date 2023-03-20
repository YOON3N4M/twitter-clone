import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../routes/Home";
import EditProfile from "../routes/EditProfile";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";

interface Props {
  isLogin: boolean;
}

function useRouter(isLogin: any) {
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

function Router({ isLogin }: Props) {
  console.log(isLogin);
  const router = useRouter(isLogin);
  return <RouterProvider router={router} />;
}

export default Router;
