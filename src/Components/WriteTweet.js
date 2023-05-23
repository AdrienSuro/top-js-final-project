import React from "react";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";

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
