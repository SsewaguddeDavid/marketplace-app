import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
            className="nameInput"
          />
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

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
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
        <Link to="/signin" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
};

export default Signup;
