import React, { ChangeEvent, FormEvent, useState } from "react";
import { TextInput, TweetT } from "../routes/Home";
import { dbService, storageService } from "../fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import styled from "styled-components";
import { useSelector } from "react-redux";

export const TweetContainer = styled.div`
  width: 750px;
  min-height: 80px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px 10px 15px 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 19%);
`;
const ProfileImgContainer = styled.div`
  position: relative;
  width: 64px;
  max-height: 100%;

  margin-right: 12px;
`;
const TextHeader = styled.div`
  width: 663px;
  margin-bottom: 10px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
`;
const TweetBody = styled.div``;
const TextContainer = styled.div``;
const AttachmentContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Attachment = styled.img`
  width: 300px;
`;
const ProfileImg = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
`;

const StyledButton = styled.button`
  opacity: 70%;
  color: black;
  margin-left: 5px;
  cursor: pointer;
`;

const AnonymousPhoto = styled.div`
  background-color: #262a56;
  border-radius: 50%;
  width: 54px;
  height: 54px;
`;
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

  const { user } = useSelector((state: any) => ({
    user: state.store.user,
  }));

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
      <TweetContainer>
        <ProfileImgContainer>
          {tweetObj.profilePhoto !== null ? (
            <ProfileImg src={tweetObj.profilePhoto} />
          ) : (
            <AnonymousPhoto />
          )}
        </ProfileImgContainer>

        <TweetBody>
          <TextHeader>
            {tweetObj.email === null ? "익명의 작성자" : `${tweetObj.email}`}
            {isOwner && (
              <div>
                <StyledButton onClick={onDeleteClick}>Delete</StyledButton>
                <StyledButton onClick={toggleEditing}>Edit</StyledButton>
              </div>
            )}
          </TextHeader>
          <TextContainer>{tweetObj.text}</TextContainer>
          <AttachmentContainer>
            {tweetObj.attachmentURL && (
              <Attachment src={tweetObj.attachmentURL} />
            )}
          </AttachmentContainer>
        </TweetBody>
      </TweetContainer>
      {editing ? (
        <>
          <TweetContainer>
            <form onSubmit={onSubmit}>
              <TextInput
                onChange={onChange}
                type="text"
                value={newTweet}
              ></TextInput>
              <StyledButton type="submit">수정</StyledButton>
              <StyledButton onClick={toggleEditing}>취소</StyledButton>
            </form>
          </TweetContainer>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Tweet;
