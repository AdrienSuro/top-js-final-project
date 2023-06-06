import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import coverPictureImg from "../img/testCover.jpg";
import profilePicImg from "../img/me.png";
import moreInfoIcon from "../icons/threedots.png";
import messagesIcon from "../icons/messages.png";
import addNotificationsIcon from "../icons/activateNotifications.png";
import TweetList from "./TweetList";
import { db, getUserDisplayName } from "./Firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function UserProfile(props) {
  const [userUserName, setUserUserName] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [userFollowersLength, setUserFollowersLength] = useState(null);
  const [userFollowingLength, setUserFollowingLength] = useState(null);

  const dispatch = useDispatch();

  function getUserUserName(username) {
    onSnapshot(doc(db, "users", username), (doc) => {
      setUserUserName(doc.data().userName);
    });
  }

  function getUserDisplayName(username) {
    onSnapshot(doc(db, "users", username), (doc) => {
      setUserDisplayName(doc.data().displayName);
    });
  }

  function getUserDescription(username) {
    onSnapshot(doc(db, "users", username), (doc) => {
      setUserDescription(doc.data().description);
    });
  }

  function getUserFollowersLength(username) {
    onSnapshot(doc(db, "users", username), (doc) => {
      setUserFollowersLength(doc.data().followers.length);
    });
  }

  function getUserFollowingLength(username) {
    onSnapshot(doc(db, "users", username), (doc) => {
      setUserFollowingLength(doc.data().following.length);
    });
  }

  useEffect(() => {
    getUserDisplayName(props.username);
    getUserDescription(props.username);
    getUserUserName(props.username);
    getUserFollowersLength(props.username);
    getUserFollowingLength(props.username);
  }, []);

  return (
    <div>
      <div className="header-wrapper">
        <div className="header-header">
          <p id="header-backarrow">&#8592;</p>
          <p id="header-userName">{userDisplayName}</p>
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
        <div id="header-main-userName">{userDisplayName}</div>
        <div id="header-main-userId">@{userUserName}</div>
        <div id="header-description">{userDescription}</div>
        <div id="header-main-details">
          <div>Science & Technology</div>
          <div>Burgundy</div>
          <div>Joined September 2022</div>
        </div>
        <div id="header-followers-following">
          <div>
            <b>{userFollowingLength}</b> Following
          </div>
          <div>
            <b>{userFollowersLength}</b> Followers
          </div>
        </div>
      </div>
      <TweetList user={props.username} />
    </div>
  );
}
