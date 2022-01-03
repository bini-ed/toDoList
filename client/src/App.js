import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import jwt from "jwt-decode";
import Homepage from "./component/homepage";
import SignUp from "./component/signup";
import Login from "./component/login";
import React, { useEffect, useState } from "react";
import UserContext from "./component/context";

function App() {
  const [user, setUser] = useState({
    user_id: "",
    firstName: "",
    lastName: "",
    userName: "",
  });

  useEffect(() => {
    async function getUser() {
      try {
        const user = jwt(localStorage.getItem("user"));
        setUser(user);
      } catch (ex) {
        return null;
      }
    }
    getUser();
  }, []);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
