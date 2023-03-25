import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fBase";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setSignOut, setFBaseInit, setUser } from "../modules/store";
import Navigation from "./Navigation";
import { updateProfile } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 800px;

  background-color: black;
  margin: 0 auto;
  border: 0.1px white solid;
  padding-bottom: 30px;
`;

type UserT = null | Object;

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setSignIn());
        dispatch(setUser(user));
        navigate("/home");
      } else {
        dispatch(setSignOut());
        dispatch(setUser({}));
        navigate("/Auth");
      }
      dispatch(setFBaseInit());
    });
  }, []);

  return (
    <>
      <AppContainer>
        <Navigation />
        <Outlet />
      </AppContainer>
    </>
  );
}

export default App;
