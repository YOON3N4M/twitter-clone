import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../fBase";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

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
      setError(error.message);
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
      console.log(data);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            onChange={onChange}
            type="text"
            placeholder="Email"
            required
          ></input>
          <input
            name="password"
            onChange={onChange}
            type="password"
            placeholder="Password"
            required
          ></input>
          <input
            type="submit"
            value={newAccount ? "Create Account" : "Sign In"}
          ></input>
          {error}
        </form>
        <span onClick={toggleAccount}>
          {newAccount ? "Sign In" : "Create Account"}
        </span>
        <div>
          <button onClick={onSocialClick} name="google">
            Continue with google
          </button>
          <button onClick={onSocialClick} name="github">
            Continue with github
          </button>
        </div>
      </div>
    </>
  );
}

export default Auth;
