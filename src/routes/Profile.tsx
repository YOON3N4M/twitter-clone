import React, { ChangeEvent, useEffect, useState } from "react";
import { auth, dbService } from "../fBase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { onSnapshot, orderBy } from "@firebase/firestore";
import Tweet from "../components/Tweet";
import styled from "styled-components";
import { Container } from "../components/Styled";

const ProfileContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100px;
  background-color: black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;
const StyledSpan = styled.span`
  margin: 0 auto;
  text-align: center;
`;

function Profile() {
  const navigate = useNavigate();
  const { isLogin, user } = useSelector((state: any) => ({
    user: state.store.user,
    isLogin: state.store.isLogin,
  }));
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const [tweets, setTweests] = useState([]);
  const onSignOutClick = () => {
    auth.signOut();
    navigate(`/`);
  };
  if (user.displayName === undefined) {
  }
  async function getMyTweets() {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorId", "==", `${user.uid}`),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const tweetArr: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweests(tweetArr);
    });
  }

  function ifNotLogin() {
    if (isLogin === false) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/auth");
    }
  }
  useEffect(() => {
    ifNotLogin();
    getMyTweets();
  }, [user]);

  function onProfileChange(event: ChangeEvent<HTMLInputElement>) {
    setNewDisplayName(event.target.value);
  }
  async function onProfileSubmit() {
    if (user.displayName !== newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
    }
  }

  return (
    <>
      {isLogin ? (
        <>
          {/* 
          <form onSubmit={onProfileSubmit}>
            <input
              onChange={onProfileChange}
              value={newDisplayName}
              type="text"
              placeholder="Display name"
            />
            <input type="submit" value="Update Profile" />
                  </form>
                  */}
          <div>
            {tweets.length === 0 ? (
              <ProfileContainer>
                <StyledSpan>내 게시글이 없습니다.</StyledSpan>
              </ProfileContainer>
            ) : null}
            {tweets.map((tweet: any) => (
              <Tweet
                key={tweet.id}
                tweetObj={tweet}
                isOwner={tweet.creatorId === user.uid}
                isProfile={true}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

export default Profile;
