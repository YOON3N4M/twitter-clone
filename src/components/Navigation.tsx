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
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {user.displayName ? `${user.displayName}의 Profile` : "내 프로필"}
          </Link>
        </li>
        {isLogin ? (
          ""
        ) : (
          <>
            <li>
              <Link to="/auth">sign in</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default Navigation;
