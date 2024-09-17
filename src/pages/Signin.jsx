import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            className="emailInput"
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              className="passwordInput"
            />
            {/* <button
              type="button"
              className={`passwordToggle ${showPassword ? "active" : ""}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button> */}
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="34px"
                viewBox="0 0 24 24"
                width="34px"
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to="/signup" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};

export default Signin;
