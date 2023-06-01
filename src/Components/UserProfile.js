import React from "react";
import coverPictureImg from "../img/testCover.jpg";
import profilePicImg from "../img/me.png";

export default function UserProfile() {
  return (
    <div>
      <div className="header-header">
        <p id="header-backarrow">&#8592;</p>
        <p id="header-userName">User Name</p>
        <div id="header-tweetCount">26.8K Tweets</div>
      </div>
      <div className="header-section">
        <img src={coverPictureImg} id="header-coverPicture"></img>
        <img src={profilePicImg} id="header-profilePicture"></img>
      </div>
    </div>
  );
}
