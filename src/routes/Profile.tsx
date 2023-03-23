import React from "react";
import { auth } from "../fBase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => ({
    user: state.store.user,
  }));

  const onSignOutClick = () => {
    navigate(`${process.env.PUBLIC_URL}/`);
    auth.signOut();
  };

  return (
    <>
      <button onClick={onSignOutClick}>Sign Out</button>
    </>
  );
}

export default Profile;
