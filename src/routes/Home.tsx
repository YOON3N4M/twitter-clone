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
import Tweet, { TweetContainer } from "../components/Tweet";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

export const TextInput = styled.input`
  background-color: white;
  color: black;
  outline: none;
  border: 0px;
  display: block;
  width: 300px;
  height: 100px;
  word-break: break-word;
`;

const FileInput = styled.input``;

export const SubmitInput = styled.input`
  background-color: rgb(43, 52, 103);
  color: white;
  border: 0px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
`;

const TweetFooter = styled.div`
  width: 710px;
  display: flex;
  justify-content: space-between;
`;

export interface TweetT {
  id?: string;
  createAt?: number;
  text?: string;
  creatorId?: string;
  attachmentURL?: string;
  email?: string;
  profilePhoto?: string;
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
        email: user.email,
        profilePhoto: user.photoURL,
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
  console.log(user);
  return (
    <>
      <div>
        {isLogin ? (
          <>
            <TweetContainer>
              <form onSubmit={onSubmit}>
                <TextInput
                  type="text"
                  placeholder="무슨 일이 일어나고 있나요?"
                  maxLength={120}
                  onChange={onChange}
                  value={tweet}
                />
                <TweetFooter>
                  <FileInput
                    onChange={onFileChange}
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                  />
                  <SubmitInput type="submit" value="게시" />
                </TweetFooter>
                {attachment && (
                  <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                  </div>
                )}
              </form>
            </TweetContainer>
          </>
        ) : null}
        <>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === user.uid}
              isProfile={false}
            />
          ))}
        </>
      </div>
    </>
  );
}

export default Home;
