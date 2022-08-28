import React from "react";
import "./Login.css";

function Login() {
  return (
    <form className="m-login-form">
      <h3>Login</h3>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
