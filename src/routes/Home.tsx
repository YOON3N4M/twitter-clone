import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  dbService,
  dbCollection,
  dbAddDoc,
  dbQuery,
  dbGetDocs,
  storageService,
} from "../fBase";
import { onSnapshot, orderBy } from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setSignOut } from "../modules/store";
import Navigation from "../components/Navigation";
import { collection } from "firebase/firestore";
import Tweet from "../components/Tweet";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

export interface TweetT {
  id?: string;
  createAt?: number;
  text?: string;
  creatorId?: string;
  attachmentURL?: string;
}
type TweetsT = TweetT[];

function Home() {
  const { user, isLogin } = useSelector((state: any) => ({
    user: state.store.user,
    isLogin: state.store.isLogin,
  }));
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<TweetsT>([]);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef<any>();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${user.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentURL = await getDownloadURL(response.ref);
    }
    try {
      const docRef = await dbAddDoc(dbCollection(dbService, "tweets"), {
        text: tweet,
        createAt: Date.now(),
        creatorId: user.uid,
        attachmentURL,
      });
      console.log(docRef);
    } catch (error) {
      console.log(error);
    }
    setTweet("");
    setAttachment("");
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

  function onFileChange(event: any) {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (finishEvent: any) => {
      const {
        currentTarget: { result },
      } = finishEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  }

  function onClearAttachment() {
    setAttachment("");
    fileInput.current.value = "";
  }
  console.log(tweets);
  return (
    <>
      <div>
        {isLogin ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
                onChange={onChange}
                value={tweet}
              />
              <input
                onChange={onFileChange}
                type="file"
                accept="image/*"
                ref={fileInput}
              />
              <input type="submit" value="tweet" />
              {attachment && (
                <div>
                  <img src={attachment} width="50px" height="50px" />
                  <button onClick={onClearAttachment}>Clear</button>
                </div>
              )}
            </form>
          </>
        ) : (
          <div>로그인을 해주세요.</div>
        )}

        <div>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === user.uid}
              isProfile={false}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
