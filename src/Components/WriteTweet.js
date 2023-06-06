import React from "react";
import { useSelector, useDispatch } from "react-redux";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import "firebase/firestore";
import {
  selectName,
  selectIsLoggedIn,
  selectDisplayName,
  selectUserName,
} from "./userSlice";

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

import { db, getProfilePicUrl } from "./Firebase";
import { v4 as uuidv4 } from "uuid";

export default function WriteTweet() {
  const displayName = useSelector(selectDisplayName);
  const userName = useSelector(selectUserName);

  // add an argument that takes the logged in user
  function uploadTweet() {
    const tweetContentField = document.getElementById("tweetContentField");
    let randomIdentifier = uuidv4();
    setDoc(doc(db, "tweets", randomIdentifier), {
      content: tweetContentField.value,
      userName: "AdrienSuro",
      displayName: displayName || "Anonym User",
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

  async function deleteTweets(besideThisUser) {
    const q = query(
      collection(db, "tweets"),
      where("userName", "!=", "adrien_surowiec")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

  return (
    <div>
      <div className="writeTweetBox">
        <img
          id="userSmallProfilePic"
          src={getProfilePicUrl()}
          alt="userProfilePicture"
        ></img>
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
