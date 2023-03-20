import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navigation() {
  const { isLogin } = useSelector((state: any) => ({
    isLogin: state.store.isLogin,
  }));
  return (
    <>
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>Home</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/profile"}>Profile</Link>
        </li>
        {isLogin ? (
          ""
        ) : (
          <>
            <li>
              <Link to={process.env.PUBLIC_URL + "/auth"}>sign in</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default Navigation;
