import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  auth,
  signUpWithGoogle,
  signOutUser,
  createUserWithEmail,
} from "../api/Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  checkExistingUser,
  getOwnTweets,
  createNewUser,
  getUserIdWithEmail,
} from "../api/Data.js";

import {
  selectIsLoggedIn,
  selectUserId,
  selectUserEmail,
  toggleIsLoggedIn,
  setUserId,
  setUserDisplayName,
  setUserEmail,
  setLoginType,
} from "../redux/userSlice.js";

import { getUserProfilePic } from "../api/Data";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function User() {
  const [imageUrl, setImageUrl] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const displayUserId = useSelector(selectUserId);
  const displayUserEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const userId = "newuser1@mail.com"; // Replace with your image name or path
        const url = await getUserProfilePic(userId);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchImage();
  }, []);

  function signUpWithGoogleAndDispatch() {
    signUpWithGoogle();
    dispatch(setLoginType("google"));
    navigate("/createaccountwithgoogle");
  }

  function signUpWithEmailAndDispatch() {
    dispatch(setLoginType("email"));
    // createUserWithEmail();
    navigate("/createaccountwithemail");
  }

  function signOutAndBackToHome() {
    signOutUser();
    navigate("/");
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // console.log(user);
      dispatch(toggleIsLoggedIn(true));
      // dispatch(setUserId(user.uid));
    } else {
      dispatch(toggleIsLoggedIn(false));
      dispatch(setUserId(null));
      dispatch(setUserEmail(null));
    }
  });

  if (isLoggedIn) {
    return (
      <div>
        <Link className="homeLink" to={displayUserId}>
          <img
            id="userSmallProfilePic"
            src={imageUrl}
            alt="userProfilePicture"
          ></img>
        </Link>
        <p>
          <b>User Email</b> : {displayUserEmail}
        </p>
        <hr></hr>
        <button onClick={signOutAndBackToHome}>Sign Out</button>
        <hr></hr>
        <button onClick={getUserIdWithEmail}>Empty Button 1</button>
        <hr></hr>
        <button>Empty Button 2</button>
        <hr></hr>
        <p>{isLoggedIn ? "signed in" : "signed out"}</p>
      </div>
    );
  }
  return (
    <div className="signInBox">
      <h1>New on Twitter ?</h1>
      <button onClick={signUpWithGoogleAndDispatch}>Sign up with Google</button>
      <button>Sign up with Apple (soon)</button>
      <button
        onClick={() => {
          signUpWithEmailAndDispatch();
        }}
      >
        Create an Account (work in progress)
      </button>
      <p>By setting up an account, you're accepting our Terms of Use.</p>
      <button onClick={() => navigate("/login")}>
        Login to an existing account
      </button>
    </div>
  );
}
