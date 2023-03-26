import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../fBase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, FormContainer } from "../components/Styled";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthInput = styled.input`
  max-width: 320px;
  width: 300px;
  padding: 10px;
  background-color: white;
  border-radius: 30px;
  font-size: 12px;
  color: black;
  margin: 0 auto;
  margin-top: 10px;
  height: 30px;
  border: 1px solid black;
`;

const AuthSubmit = styled.input`
  margin: 0 auto;
  width: 300px;
  text-align: center;
  background: #262a56;
  color: white;
  margin-top: 10px;
  cursor: pointer;
  border: solid 1px black;
  border-radius: 30px;
  height: 30px;
`;
const SocialLoginContainer = styled.div`
  width: 300px;
  display: flex;

  margin: 0 auto;
  margin-top: 20px;
  justify-content: space-between;
`;
const SocialLoginBtn = styled.button`
  width: 120px;
  height: 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 30px;
  cursor: pointer;
`;

export const ChangableSpan = styled.span<{ color: string }>`
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
  color: ${(props: any) => (props.color === "red" ? "#e74c3c" : "black")};
`;

const ChangableB = styled.b`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
  color: black;
`;

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { isLogin } = useSelector((state: any) => ({
    isLogin: state.store.isLogin,
  }));

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      let data;

      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
      switch (error.message) {
        case "Firebase: Error (auth/user-not-found).":
          setErrorMsg("존재하지 않는 계정 입니다.");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setErrorMsg("잘못된 비밀번호 입니다.");
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          setErrorMsg("이미 사용중인 이메일 입니다.");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setErrorMsg("비밀번호는 최소 6자리 이상이여야 합니다.");
          break;
        default:
          break;
      }
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event: React.MouseEvent) => {
    const { name } = event.target as HTMLInputElement;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    if (provider !== undefined) {
      const data = await signInWithPopup(auth, provider);
    }
  };

  useEffect(() => {
    if (isLogin === true) {
      navigate(`/`);
    }
  }, [isLogin]);

  console.log(isLogin);
  return (
    <>
      <Container>
        <FormContainer onSubmit={onSubmit}>
          <AuthInput
            name="email"
            onChange={onChange}
            type="text"
            required
            placeholder="E-mail"
          ></AuthInput>
          <AuthInput
            name="password"
            onChange={onChange}
            type="password"
            required
            placeholder="Password"
          ></AuthInput>
          <AuthSubmit
            type="submit"
            value={newAccount ? "회원가입" : "로그인"}
          />
          <ChangableSpan color="red">{errorMsg}</ChangableSpan>
        </FormContainer>
        <SocialLoginContainer>
          <SocialLoginBtn onClick={onSocialClick} name="google">
            Google
            <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faGoogle} />
          </SocialLoginBtn>
          <SocialLoginBtn onClick={onSocialClick} name="github">
            Github
            <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faGithub} />
          </SocialLoginBtn>
        </SocialLoginContainer>
        <ChangableSpan color="white">
          {newAccount ? "계정이 있다면?" : "계정이 없으신가요?"}{" "}
          <ChangableB onClick={toggleAccount}>
            {newAccount ? "로그인" : "회원가입"}{" "}
          </ChangableB>
        </ChangableSpan>
      </Container>
    </>
  );
}

export default Auth;
