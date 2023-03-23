import React, { ChangeEvent, FormEvent, useState } from "react";
import { TweetT } from "../routes/Home";
import { dbService, storageService } from "../fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";

interface Props {
  tweetObj: TweetT;
  isOwner: boolean;
  isProfile: boolean;
}

function Tweet({ tweetObj, isOwner, isProfile }: Props) {
  const TweetRef = doc(dbService, "tweets", `${tweetObj.id}`);
  const urlRef = ref(storageService, tweetObj.attachmentURL);
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  async function onDeleteClick() {
    const ok = window.confirm("게시글을 삭제 합니다.");
    if (ok) {
      await deleteDoc(TweetRef);
      if (tweetObj.attachmentURL !== "") {
        await deleteObject(urlRef);
      }
    }
  }

  function toggleEditing() {
    setEditing((prev) => !prev);
    setNewTweet(tweetObj.text);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTweet(event.target.value);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    updateDoc(TweetRef, {
      text: newTweet,
    });
    setEditing((prev) => !prev);
  }
  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" value={newTweet}></input>
            <button>Update Tweet</button>
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <div>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentURL && (
            <img src={tweetObj.attachmentURL} height="50px" width="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Tweet;
