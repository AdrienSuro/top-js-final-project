import React from "react";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import { tweetsCollection, db } from "./Firebase";

import { doc, onSnapshot } from "firebase/firestore";

const testFn = onSnapshot(doc(db, "tweets", "1NLk0be5rAnLrfDnSP9V"), (doc) => {
  console.log("Current data: ", doc.data());
});

export default function WriteTweet() {
  return (
    <div>
      <div className="writeTweetBox">
        <img src={myProfilePicture} alt="userProfilePicture"></img>
        <textarea placeholder="What is happening?!"></textarea>
        <div className="tweetOptions">
          <div className="tweetOptionsIcon">
            <img src={imageIcon}></img>
          </div>
          <button className="tweetBtn">Tweet</button>
        </div>
      </div>
    </div>
  );
}
