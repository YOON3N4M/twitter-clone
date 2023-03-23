import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  dbService,
  dbCollection,
  dbAddDoc,
  dbQuery,
  dbGetDocs,
} from "../fBase";
import { onSnapshot, orderBy } from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setSignOut } from "../modules/store";
import Navigation from "../components/Navigation";
import { collection } from "firebase/firestore";
import Tweet from "../components/Tweet";

export interface TweetT {
  id?: string;
  createAt?: number;
  text?: string;
  creatorId?: string;
}
type TweetsT = TweetT[];

function Home() {
  const { user } = useSelector((state: any) => ({
    user: state.store.user,
  }));
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<TweetsT>([]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const docRef = await dbAddDoc(dbCollection(dbService, "tweets"), {
        text: tweet,
        createAt: Date.now(),
        creatorId: user.uid,
      });
      console.log(docRef);
    } catch (error) {
      console.log(error);
    }
    setTweet("");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTweet(event.target.value);
  };

  useEffect(() => {
    const q = dbQuery(
      dbCollection(dbService, "tweets"),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newTweetsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(newTweetsArr);
    });
  }, []);

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            onChange={onChange}
            value={tweet}
          />
          <input type="submit" value="tweet" />
        </form>
        <div>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === user.uid}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
