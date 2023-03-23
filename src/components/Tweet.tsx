import React, { ChangeEvent, FormEvent, useState } from "react";
import { TweetT } from "../routes/Home";
import { dbService } from "../fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

interface Props {
  tweetObj: TweetT;
  isOwner: boolean;
}

function Tweet({ tweetObj, isOwner }: Props) {
  const TweetRef = doc(dbService, "tweets", `${tweetObj.id}`);
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  function onDeleteClick() {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      deleteDoc(TweetRef);
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
