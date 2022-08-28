import React, { useRef } from "react";
import "./Register.css";
import axios from "axios";
import { getUsers } from "../../../services/AuthService";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const registerUser = async (username, email, password) => {
    let users = await getUsers().then((res) => res.data);
    if (users === null) {
      axios.post(process.env.REACT_APP_FIREBASE_USERS, {
        username: username,
        email: email,
        password: password,
      });
      return;
    }

    let userExists = false;
    Object.keys(users).forEach((id) => {
      if (users[id].username === username || users[id].email === email) {
        userExists = true;
        return;
      }
    });

    if (!userExists) {
      axios.post(process.env.REACT_APP_FIREBASE_USERS, {
        username: username,
        email: email,
        password: password,
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //TODO: add validation
    //TODO: add crypt for password
    registerUser(username, email, password);
  };

  return (
    <form className="m-login-form" onSubmit={submitHandler}>
      <h3>Register</h3>
      <input type="text" placeholder="Username" ref={usernameRef} />
      <input type="text" placeholder="E-mail" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <input type="submit" value="Login" />
    </form>
  );
}

export default Register;
