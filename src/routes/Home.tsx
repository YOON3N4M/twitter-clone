import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fBase";
import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setSignOut } from "../modules/store";
import Navigation from "../components/Navigation";

function Home() {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);

  const { isLogin } = useSelector((state: any) => ({
    isLogin: state.store.isLogin,
  }));
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setSignIn());
      } else {
        dispatch(setSignOut());
      }
      setInit(true);
    });
  }, []);

  console.log(isLogin);

  return (
    <>
      <Navigation />
      <div>home</div>
    </>
  );
}

export default Home;
