import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navigation() {
  const { isLogin, user } = useSelector((state: any) => ({
    isLogin: state.store.isLogin,
    user: state.store.user,
  }));

  console.log(user.displayName);
  return (
    <>
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>Home</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/profile"}>
            {user.displayName ? `${user.displayName}의 Profile` : "내 프로필"}
          </Link>
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
