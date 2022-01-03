import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/login.css";

import { Link } from "react-router-dom";

function Login() {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    password: "",
  });
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const users = localStorage.getItem("user");
    if (users) {
      window.location = "http://localhost:3000/";
    }
  }, [profile]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setUserLogin({ ...userLogin, [input.name]: input.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { userName, password } = userLogin;
    await axios
      .post("http://localhost:5000/userAuthenticate", {
        userName,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", res.data);
        setProfile(res.data);
      })
      .catch((err) => setError(err.data ? err.data : err.response.data));
    setLoading(false);
  };
  return (
    <div className="login">
      {loading && <h2>Loading....</h2>}
      {error && (
        <h3 style={{ textAlign: "center", color: "red", fontSize: 25 }}>
          {error}
        </h3>
      )}
      <h3 style={{ color: "white", marginTop: 50 }}>Login</h3>
      <form className="form">
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            placeholder="Enter email"
            value={userLogin.userName}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={userLogin.password}
            onChange={handleChange}
          ></input>
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          onClick={handelSubmit}
          value="Submit"
        ></input>
      </form>
      <Link
        to="/Signup"
        style={{
          textDecoration: "none",
          fontSize: 25,
          margin: 10,
          color: "white",
        }}
      >
        Don't have an account ? Create Account
      </Link>
    </div>
  );
}

export default Login;
