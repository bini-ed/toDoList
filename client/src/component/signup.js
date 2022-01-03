import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";

import "../css/login.css";

function SignUp() {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [userProfiles, setUserProfiles] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (userProfiles.user_id) window.location = "/";
  }, [userProfiles]);

  const handleChange = ({ currentTarget: input }) => {
    setUserProfile({ ...userProfile, [input.name]: input.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { firstName, lastName, userName, password } = userProfile;
    await axios
      .post("http://localhost:5000/createUser", {
        firstName,
        lastName,
        userName,
        password,
      })
      .then((res) => {
        setSuccess(res.data);
        localStorage.setItem("user", res.headers["user-auth-token"]);
        const user = jwtDecode(res.headers["user-auth-token"]);
        setUserProfiles(user);
      })
      .catch((err) => {
        setError(err.data ? err.data : err.response.data);
      });
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
      {success && (
        <h3 style={{ textAlign: "center", color: "green", fontSize: 25 }}>
          {success}
        </h3>
      )}
      <h3 style={{ color: "white", marginTop: 50 }}>Sign Up</h3>
      <form className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            placeholder="First Name"
            required
            value={userProfile.firstName}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Last Name"
            required
            value={userProfile.lastName}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            placeholder="User Name"
            required
            value={userProfile.userName}
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
            required
            value={userProfile.password}
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
        to="/Login"
        style={{
          textDecoration: "none",
          fontSize: 25,
          margin: 10,
          color: "white",
        }}
      >
        Already have an account ? Login here
      </Link>
    </div>
  );
}

export default SignUp;
