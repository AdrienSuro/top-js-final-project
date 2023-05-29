import React from "react";
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

import { db, getUserName, getProfilePicUrl } from "./Firebase";
import { v4 as uuidv4 } from "uuid";

export default function WriteTweet() {
  function uploadTweet() {
    const tweetContentField = document.getElementById("tweetContentField");
    let randomIdentifier = uuidv4();
    setDoc(doc(db, "tweets", randomIdentifier), {
      content: tweetContentField.value,
      userName: "Charles_0001",
      name: "Call me Charly",
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
        <img src={getProfilePicUrl()} alt="userProfilePicture"></img>
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
