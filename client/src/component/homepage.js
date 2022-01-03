import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/homepage.css";
import List from "./addList";
import UserContext from "./context";

function Homepage() {
  const context = useContext(UserContext);
  const handleClick = () => {
    localStorage.removeItem("user");
    context.setUser({});
  };
  return (
    <div>
      <div className="app_header">
        <h2 className="app_header_text">To-Do List App</h2>
        <div className="profile">
          {context.user.userName ? (
            <h3 style={{ cursor: "pointer" }} onClick={handleClick}>
              {context.user.firstName}
              <sub>log out</sub>
            </h3>
          ) : (
            ""
          )}
        </div>
      </div>
      {context.user.userName ? (
        <List></List>
      ) : (
        <div className="loginOrRegister">
          <Link to="SignUp" className="btnSignup">
            Sign Up
          </Link>
          <Link to="Login" className="btnLogin">
            {" "}
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Homepage;
