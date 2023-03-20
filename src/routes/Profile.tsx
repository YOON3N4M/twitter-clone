import React from "react";
import { auth } from "../fBase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
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
