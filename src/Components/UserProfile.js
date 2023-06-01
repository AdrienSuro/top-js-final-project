import React from "react";
import coverPictureImg from "../img/testCover.jpg";
import profilePicImg from "../img/me.png";
import moreInfoIcon from "../icons/threedots.png";
import messagesIcon from "../icons/messages.png";
import addNotificationsIcon from "../icons/activateNotifications.png";
import TweetList from "./TweetList";
import { useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState("anonymous");

  return (
    <div>
      <div className="header-wrapper">
        <div className="header-header">
          <p id="header-backarrow">&#8592;</p>
          <p id="header-userName">Adrien Surowiec</p>
          <div id="header-tweetCount">26.8K Tweets</div>
        </div>
        <div className="header-section">
          <img src={coverPictureImg} id="header-coverPicture"></img>
          <img src={profilePicImg} id="header-profilePicture"></img>
          <div class="header-buttons-section">
            {" "}
            <img class="header-button" src={moreInfoIcon}></img>
            <img class="header-button" src={messagesIcon}></img>
            <img class="header-button" src={addNotificationsIcon}></img>
            <div id="followingButton">Following</div>
          </div>
        </div>
      </div>
      <div className="header-main-wrapper">
        <div id="header-main-userName">Adrien Surowiec</div>
        <div id="header-main-userId">@ad_sw</div>
        <div id="header-description">
          On my way to become a Fullstack Developer #javascript #reactJS
        </div>
        <div id="header-main-details">
          <div>Science & Technology</div>
          <div>Burgundy</div>
          <div>Joined September 2022</div>
        </div>
        <div id="header-followers-following">
          <div>
            <b>4106</b> Following
          </div>
          <div>
            <b>2300</b> Followers
          </div>
        </div>
      </div>
      <TweetList user={user} />
    </div>
  );
}
