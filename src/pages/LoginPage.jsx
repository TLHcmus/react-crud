import { useState } from "react";
import "./LoginPage.scss";

const LoginPage = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="header">Log in</div>
      <div className="text">Email or username</div>
      <input
        type="text"
        placeholder="Email or username"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div className="password-textbox">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <i className="fa-solid fa-eye"></i>
      </div>

      <button
        type="submit"
        className={email && password ? "active" : ""}
        disabled={!email || !password}
        onClick={() => {
          console.log("Button clicked");
        }}
      >
        Log in
      </button>
    </div>
  );
};

export default LoginPage;
