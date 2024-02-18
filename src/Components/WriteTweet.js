import React from "react";
import { useSelector, useDispatch } from "react-redux";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import "firebase/firestore";
import { writeTweet } from "../api/Data";

import { firebase } from "firebase/app";
import {
  doc,
  setDoc,
  deleteDoc,
  querySnapshot,
  query,
  where,
  collection,
  getDocs,
  docRef,
} from "firebase/firestore";

import {
  selectIsLoggedIn,
  selectUserId,
  selectUserEmail,
} from "../redux/userSlice.js";

import { db, getProfilePicUrl } from "../api/Firebase";
import { v4 as uuidv4 } from "uuid";

export default function WriteTweet() {
  const displayUserId = useSelector(selectUserId);
  const displayUserEmail = useSelector(selectUserEmail);
  const tweetContentField = document.getElementById("tweetContentField");

  return (
    <div>
      <div className="writeTweetBox">
        <img id="userSmallProfilePic" src="" alt="userProfilePicture"></img>
        <textarea
          placeholder="What is happening?!"
          id="tweetContentField"
        ></textarea>
        <div className="tweetOptions">
          <div className="tweetOptionsIcon">
            <img src={imageIcon}></img>
          </div>
          <button
            className="tweetBtn"
            onClick={() => {
              writeTweet(
                tweetContentField.value,
                displayUserEmail,
                displayUserId
              );
              tweetContentField.value = "";
            }}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
