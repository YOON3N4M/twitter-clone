import { updateProfile } from "firebase/auth";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow-y: hidden;
`;
const ModalBack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalWindow = styled.div`
  width: 500px;
  height: 550px;
  text-align: center;
  text-decoration: none;
  padding-top: 20px;
  background-color: white;
  border-radius: 30px;
  color: #4000c7;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 10px;
  //background-color: orange;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 30px;
`;
const ImgDiv = styled.div`
  margin: 0 auto;
  width: 124px;
  height: 124px;
  border-radius: 50%;
  margin-top: 80px;
  background-color: #262a56;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Line = styled.hr`
  margin-bottom: 50px;
  background-color: gray;
  opacity: 30%;
  width: 190px;
`;

const ExitBtn = styled.button`
  background-color: rgb(0, 0, 0, 0);
  border: 0px;
  cursor: pointer;
  margin-right: 5px;
`;
const NameInput = styled.input`
  text-align: center;
  border: 0px;
  outline: none;
  color: gray;
  // background-color: rgb(0, 0, 0, 0);

  font-weight: bold;
  font-size: 2em;
  margin-top: 1px;
`;
const HFive = styled.h5`
  color: #5b5a5a;
`;
const HOne = styled.h1`
  color: black;
  cursor: pointer;
`;

/* 폼 예시
    <form onSubmit={onProfileSubmit}>
            <input
              onChange={onProfileChange}
              value={newDisplayName}
              type="text"
              placeholder="Display name"
            />
            <input type="submit" value="Update Profile" />
          </form>
*/
interface Props {
  toggle: boolean;
  setToggle: Function;
}

function ProfileModal({ toggle, setToggle }: Props) {
  const { user } = useSelector((state: any) => ({
    user: state.store.user,
  }));
  const [canChange, setCanChange] = useState(false);
  const [name, setName] = useState<any>();
  function onNameClick() {
    setCanChange((prev) => !prev);
    console.log(canChange);
  }

  useEffect(() => {
    console.log(user);
    if (user.displayName) {
      setName(user.displayName);
    } else if (user.email) {
      setName(user.email);
    } else setName("익명의 작성자");
  }, []);
  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  async function onNameSubmit(event: FormEvent) {
    event.preventDefault();
    if (user.displayName !== name) {
      await updateProfile(user, { displayName: name })
        .then(() => {
          alert("닉네임이 성공적으로 변경되었습니다.");
          setCanChange((prev) => !prev);
        })
        .catch((error) => alert(error));
    } else if (user.displayName === name) {
      alert("변경된 점이 없습니다.");
      setCanChange((prev) => !prev);
    }
  }

  return (
    <>
      <ModalContainer>
        <ModalBack>
          <ModalWindow>
            <ModalHeader>
              <ExitBtn
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                X
              </ExitBtn>
            </ModalHeader>
            <ImgDiv></ImgDiv>
            <Line></Line>
            {canChange ? (
              <>
                {" "}
                <form onSubmit={onNameSubmit}>
                  <NameInput
                    autoFocus
                    value={name}
                    onClick={onNameClick}
                    onChange={onNameChange}
                  />
                </form>
              </>
            ) : (
              <HOne onClick={onNameClick}>{name}</HOne>
            )}

            <HFive>{user.email && user.email}</HFive>
          </ModalWindow>
        </ModalBack>
      </ModalContainer>
    </>
  );
}

export default ProfileModal;
