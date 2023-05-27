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

import { db } from "./Firebase";
import { v4 as uuidv4 } from "uuid";

export default function WriteTweet() {
  function uploadTweet() {
    console.log("inside uploadTweet");
    setDoc(doc(db, "tweets", uuidv4()), {
      content: document.getElementById("tweetContentField").value,
      userName: "Charles_0001",
      name: "Call me Charly",
      timestamp: new Date().toUTCString(),
    });
  }

  async function deleteTweets(besideThisUser) {
    const q = query(
      collection(db, "tweets"),
      where("userName", "!=", besideThisUser)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

  return (
    <div>
      <div className="writeTweetBox">
        <img src={myProfilePicture} alt="userProfilePicture"></img>
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
