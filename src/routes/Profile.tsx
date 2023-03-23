import React, { ChangeEvent, useEffect, useState } from "react";
import { auth, dbService } from "../fBase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { onSnapshot, orderBy } from "@firebase/firestore";
import Tweet from "../components/Tweet";

function Profile() {
  const navigate = useNavigate();
  const { isLogin, user } = useSelector((state: any) => ({
    user: state.store.user,
    isLogin: state.store.isLogin,
  }));
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const [tweets, setTweests] = useState([]);
  const onSignOutClick = () => {
    navigate(`${process.env.PUBLIC_URL}/`);
    auth.signOut();
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

  useEffect(() => {
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

  console.log(tweets);

  return (
    <>
      <form onSubmit={onProfileSubmit}>
        <input
          onChange={onProfileChange}
          value={newDisplayName}
          type="text"
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      {isLogin ? <button onClick={onSignOutClick}>Sign Out</button> : null}
      <div>
        {tweets.map((tweet: any) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === user.uid}
            isProfile={true}
          />
        ))}
      </div>
      <span>{user.displayName}의 프로필 입니다.</span>
    </>
  );
}

export default Profile;
