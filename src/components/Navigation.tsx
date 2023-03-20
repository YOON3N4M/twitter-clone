import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>Home</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/profile"}>Profile</Link>
        </li>
      </ul>
    </>
  );
}

export default Navigation;
