import React from "react";
import { useSelector, useDispatch } from "react-redux";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import "firebase/firestore";

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

  // add an argument that takes the logged in user
  function uploadTweet() {
    const tweetContentField = document.getElementById("tweetContentField");
    let randomIdentifier = uuidv4();
    setDoc(doc(db, "tweets", randomIdentifier), {
      content: tweetContentField.value,
      userEmail: displayUserEmail,
      userId: displayUserId,
      timestamp: new Date(),
      comments: getRandomNum(),
      retweets: getRandomNum(),
      likes: getRandomNum(),
      stats: getRandomNum(),
      docId: randomIdentifier,
    });
    tweetContentField.value = "";
  }

  function getRandomNum() {
    return Math.floor(Math.random() * 999);
  }

  // Will be deleted and moved to api/Firebase ou Data
  async function deleteTweets(besideThisUser) {
    const q = query(
      collection(db, "tweets"),
      where("userName", "===", "AdrienSuro")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

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
          <button className="tweetBtn" onClick={uploadTweet}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
