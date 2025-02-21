import { useContext, useEffect, useState } from "react";
import "./LoginPage.scss";
import { postLogin } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const LoginPage = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await postLogin(email, password);
      if (res && res.token) {
        login(email, res.token);
        navigate("/");
      } else {
        throw new Error("No token received!");
      }
    } catch (error) {
      setError("Username or password dosen't match our records. Try again.");
    } finally {
      setLoading(false);
    }
  };
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
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <i
          className={`fa-solid fa-eye${isShowPassword ? "" : "-slash"}`}
          onClick={() => {
            setIsShowPassword((prev) => !prev);
          }}
        ></i>
      </div>
      {error && <div className="error-message">{error}</div>}

      <button
        type="submit"
        className={email && password ? "active" : ""}
        disabled={!email || !password || loading}
        onClick={handleLogin}
      >
        {loading ? <i className="fas fa-circle-notch fa-spin"></i> : "Log in"}
      </button>
    </div>
  );
};

export default LoginPage;
