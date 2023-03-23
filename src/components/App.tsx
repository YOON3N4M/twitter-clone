import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fBase";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setSignOut, setFBaseInit, setUser } from "../modules/store";
import Navigation from "./Navigation";

type UserT = null | Object;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setSignIn());
        dispatch(setUser(user));
      } else {
        dispatch(setSignOut());
        dispatch(setUser({}));
      }
      dispatch(setFBaseInit());
    });
  }, []);

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
