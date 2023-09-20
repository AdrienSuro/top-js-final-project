import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserId, selectLoginType } from "../redux/userSlice.js";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import "firebase/firestore";
import { selectIsLoggedIn } from "../redux/userSlice";

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

import { db, getProfilePicUrl } from "../api/Firebase";
import { v4 as uuidv4 } from "uuid";

export default function WriteTweet() {
  const displayUserId = useSelector(selectUserId);

  // add an argument that takes the logged in user
  function uploadTweet() {
    const tweetContentField = document.getElementById("tweetContentField");
    let randomIdentifier = uuidv4();
    setDoc(doc(db, "tweets", randomIdentifier), {
      content: tweetContentField.value,
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
