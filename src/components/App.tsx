import React, { useEffect, useState } from "react";
import Router from "./Router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log(auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Router isLogin={isLogin}></Router> : ""}

      <footer>&copy; {new Date().getFullYear()} Twitter clone</footer>
    </>
  );
}

export default App;
