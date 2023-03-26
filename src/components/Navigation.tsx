import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../fBase";

const NavigationContainer = styled.div`
  width: 100%;
  background-color: #2b3467;
  display: flex;
  flex-direction: row;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 19%);
  color: white;
`;
const NavigationUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
`;
const NavigationLi = styled.li`
  margin-right: 30px;
  float: left;
`;

function Navigation() {
  const { isLogin, user } = useSelector((state: any) => ({
    isLogin: state.store.isLogin,
    user: state.store.user,
  }));
  const navigate = useNavigate();

  const onSignOutClick = () => {
    auth.signOut();
    navigate(`/`);
  };
  return (
    <>
      <NavigationContainer>
        <div>
          <NavigationUl>
            <NavigationLi>
              <Link to="/">홈</Link>
            </NavigationLi>
            <NavigationLi>
              <Link to="/profile">내 피드</Link>
            </NavigationLi>
          </NavigationUl>
        </div>
        <NavigationUl>
          {isLogin ? (
            <NavigationLi>
              <div style={{ cursor: "pointer" }} onClick={onSignOutClick}>
                로그아웃{" "}
              </div>
            </NavigationLi>
          ) : (
            <>
              <NavigationLi>
                <Link to="/auth">로그인</Link>
              </NavigationLi>
            </>
          )}
        </NavigationUl>
      </NavigationContainer>
    </>
  );
}

export default Navigation;
