import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectWithEmail, connectWithGoogle } from "../api/Login";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {
  checkExistingUser,
  getOwnTweets,
  createNewUser,
  getUserIdWithEmail,
} from "../api/Data.js";
import {
  auth,
  signUpWithGoogle,
  signOutUser,
  createUserWithEmail,
} from "../api/Firebase.js";

import {
  selectIsLoggedIn,
  selectUserId,
  toggleIsLoggedIn,
  setUserId,
  setUserDisplayName,
  setLoginType,
  setUserEmail,
} from "../redux/userSlice.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const displayUserId = useSelector(selectUserId);

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
        onClick={async () => {
          try {
            let connexionResult = await connectWithEmail(
              document.getElementById("emailField").value,
              document.getElementById("passwordField").value
            );
            if (connexionResult != false) {
              console.log(connexionResult);
              dispatch(setUserId(document.getElementById("emailField").value));
              dispatch(setUserEmail(connexionResult));
              let id = await getUserIdWithEmail(connexionResult);
              console.log("id is " + id);
              dispatch(setLoginType("email"));
              navigate("/");
            } else {
              alert("Ups, we don't know these credentials");
            }
          } catch (error) {
            console.error("An error occurred: ", error);
          }
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
