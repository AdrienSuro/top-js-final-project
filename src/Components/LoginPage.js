import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectWithEmail, connectWithGoogle } from "../api/Login";
import { setLoginType, setUserDisplayName, setUserId } from "../redux/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Login Page</h1>
      <button
        onClick={() => {
          dispatch(setLoginType("google"));
          connectWithGoogle();
          navigate("/");
        }}
      >
        Connect with Google
      </button>
      <h1>OR</h1>
      <input type="text" name="emailField" id="emailField"></input>
      <input type="text" name="passwordField" id="passwordField"></input>
      <button
        onClick={() => {
          dispatch(setUserId(document.getElementById("emailField").value));
          dispatch(setLoginType("email"));
          connectWithEmail(
            document.getElementById("emailField").value,
            document.getElementById("passwordField").value
          )
            ? console.log("true")
            : console.log("false");
          navigate("/");
        }}
      >
        Connect with Email
      </button>
      <hr></hr>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Homepage
      </button>
    </div>
  );
}
