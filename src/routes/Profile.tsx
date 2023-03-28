import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { auth, dbService } from "../fBase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { onSnapshot, orderBy } from "@firebase/firestore";
import Tweet from "../components/Tweet";
import styled from "styled-components";
import { Container, fadein } from "../components/theme";
import ProfileModal from "../components/ProfileModal";

const ProfileContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100px;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  animation: ${fadein} 0.5s ease-in-out;
`;
const StyledSpan = styled.span`
  margin: 0 auto;
  text-align: center;
`;
const ProfileHeader = styled.div`
  width: 100%;
  //background-color: yellow;
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;
const ProfileBtn = styled.button`
  background-color: rgb(43, 52, 103);
  height: 30px;
  margin-right: 15px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

function Profile() {
  const navigate = useNavigate();
  const { isLogin, user } = useSelector((state: any) => ({
    user: state.store.user,
    isLogin: state.store.isLogin,
  }));
  const [toggle, setToggle] = useState(false);
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

  function ifNotLogin() {}
  useEffect(() => {
    ifNotLogin();
    getMyTweets();
  }, [user]);

  function onProfileChange(event: ChangeEvent<HTMLInputElement>) {
    setNewDisplayName(event.target.value);
  }

  async function onProfileSubmit(event: FormEvent) {
    event.preventDefault();
    if (user.displayName !== newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName })
        .then(() => {
          alert("닉네임이 성공적으로 변경되었습니다.");
          navigate("/");
        })
        .catch((error) => alert(error));
    }
  }

  function onToggle() {
    setToggle((prev) => !prev);
  }
  return (
    <>
      {toggle ? (
        <>
          <ProfileModal setToggle={setToggle} toggle={toggle}></ProfileModal>
        </>
      ) : (
        ""
      )}
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
            <ProfileHeader>
              <ProfileBtn onClick={onToggle}>내 프로필</ProfileBtn>
            </ProfileHeader>

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
      ) : (
        <ProfileContainer>
          <StyledSpan>로그인 후 이용 가능합니다.</StyledSpan>
        </ProfileContainer>
      )}
    </>
  );
}

export default Profile;
