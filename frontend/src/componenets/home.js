// import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./home.css";
import toast from "react-hot-toast";

import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    console.log("hii");
    let accessTokenCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="));
    if (accessTokenCookie) {
      console.log("hoo");
      setIsAuthenticated(true);
    } else {
      console.log("Access Token not found");
    }
  }, [location]);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const accessToken = document.cookie.split("; ");
    console.log(accessToken);
    axios
      .post("http://localhost:4000/api/v1/users/logout", [], {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        toast.success("Logged Out Successfully");
        setIsAuthenticated(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <>
      <nav className="header">
        <div>
          <h2>Todo App.</h2>
        </div>
        {/* <article>
          <Link to={"/"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>
          {isAuthenticated ? (
            <Link to={"/"} onClick={logoutHandler}>
              Logout
            </Link>
          ) : (
            <Link to={"/login"}>Signup</Link>
          )}
        </article> */}
        <article>
          <Link
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            to={"/"}
          >
            Home
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
            to={"/about"}
          >
            About
          </Link>
          {isAuthenticated ? (
            <Link
              className={`nav-link ${
                location.pathname === "/logout" ? "active" : ""
              }`}
              to={"/"}
              // disabled={loading}
              onClick={logoutHandler}
            >
              Logout
            </Link>
          ) : (
            <Link
              className={`nav-link ${
                location.pathname === "/login" ? "active" : ""
              }`}
              to={"/login"}
            >
              Signup
            </Link>
          )}
        </article>
      </nav>
    </>
  );
};

export default Header;
