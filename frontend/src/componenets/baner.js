import Todos from "./Todos.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./baner.css";
function Baner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const accessTokenCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="));
    if (accessTokenCookie) {
      if (isMounted) {
        setIsAuthenticated(true);
      }
    } else {
      console.log("Access Token not found");
      if (isMounted) {
        setIsAuthenticated(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [location]);
  const handleCreatelist = () => {
    navigate("/login");
  };
  return (
    <>
      {isAuthenticated ? (
        <div>
          <Todos />
        </div>
      ) : (
        <div className="home-container">
          <img
            className="background-image"
            src="../../public/homeimage.jpg"
            alt="Background"
            loading="lazy"
          />
          <div className="content">
            <button className="create-list-btn" onClick={handleCreatelist}>
              Create your own list !!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Baner;
