import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    email: "",
    username: "", // Added username field for signup
    password: "",
    reenterPassword: "", // Added reenter password field for signup
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const formInputs = document.querySelectorAll(".form input, .form textarea");
    formInputs.forEach((input) => {
      input.addEventListener("keyup", handleInput);
      input.addEventListener("blur", handleInput);
      input.addEventListener("focus", handleInput);

      return () => {
        input.removeEventListener("keyup", handleInput);
        input.removeEventListener("blur", handleInput);
        input.removeEventListener("focus", handleInput);
      };
    });

    return () => {
      formInputs.forEach((input) => {
        input.removeEventListener("keyup", handleInput);
        input.removeEventListener("blur", handleInput);
        input.removeEventListener("focus", handleInput);
      });
    };
  });

  const handleInput = (e) => {
    const { type, value } = e.target;
    const label = e.target.previousElementSibling;

    if (
      type === "text" ||
      type === "password" ||
      type === "email" ||
      type === "reenterpassword"
    ) {
      if (value === "") {
        label.classList.remove("active", "highlight");
      } else {
        label.classList.add("active", "highlight");
      }
    }
  };

  const handleRegister = async (e) => {
    console.log("hi");
    e.preventDefault();
    let data = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
    };
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        data
      );
      console.log(res);
      // alert("User Registered Successfully");
      toast.success("User Registered Successfully");
      setFormData({
        email: "",
        password: "",
        username: "",
        reenterPassword: "",
      });
    } catch (error) {
      console.error("Error during Registering", error);
    }
  };
  // const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    // const { isAuthenticated, setIsAuthenticated } = location;
    // console.log(location.state);
    e.preventDefault();

    let data;
    if (formData.email.includes("@")) {
      data = {
        email: formData.email,
        password: formData.password,
      };
    } else {
      data = {
        username: formData.email,
        password: formData.password,
      };
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        data,
        { withCredentials: true }
      );
      console.log(res);
      setFormData({
        email: "",
        password: "",
        username: "",
        reenterPassword: "",
      });

      toast.success("Signedin Successfully");

      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="form">
        <ul className="tab-group">
          <li className={`tab ${activeTab === "signup" ? "active" : ""}`}>
            <a onClick={() => handleTabClick("signup")}>Sign Up</a>
          </li>
          <li className={`tab ${activeTab === "login" ? "active" : ""}`}>
            <a onClick={() => handleTabClick("login")}>Log In</a>
          </li>
        </ul>

        <div className="tab-content">
          <div
            id="signup"
            style={{ display: activeTab === "signup" ? "block" : "none" }}
          >
            <h1>Sign Up for Free</h1>

            <form
              // action="/api/v1/users/register"
              onSubmit={handleRegister}
              // method="post"
            >
              <div className="top-row"></div>

              <div className="field-wrap">
                <label>
                  Email Address<span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="field-wrap">
                <label>
                  Username<span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  value={formData.username}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="field-wrap">
                <label>
                  Password<span className="req">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="field-wrap">
                <label>
                  Re-enter Password<span className="req">*</span>
                </label>
                <input
                  type="password"
                  name="reenterPassword"
                  onChange={handleInputChange}
                  value={formData.reenterPassword}
                  required
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                // onClick={handleSubmit2}
                className="button button-block"
              >
                Get Started
              </button>
            </form>
          </div>

          <div
            id="login"
            style={{ display: activeTab === "login" ? "block" : "none" }}
          >
            <h1>Welcome Back!</h1>

            <form action="/" method="post">
              <div className="field-wrap">
                <label>
                  Email/Username<span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  autoComplete="off"
                />
              </div>

              <div className="field-wrap">
                <label>
                  Password<span className="req">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                  autoComplete="off"
                />
              </div>

              <p className="forgot">
                <a href="#">Forgot Password?</a>
              </p>

              <button
                type="submit"
                onClick={handleLogin}
                className="button button-block"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
