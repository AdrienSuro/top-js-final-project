import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import coverPictureImg from "../img/testCover.jpg";
import profilePicImg from "../img/me.png";
import moreInfoIcon from "../icons/threedots.png";
import messagesIcon from "../icons/messages.png";
import addNotificationsIcon from "../icons/activateNotifications.png";
import TweetList from "./TweetList";
import UserTweets from "./UserTweets";
import { db } from "../api/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import {
  checkExistingUser,
  getUserDescription,
  getUserDisplayName,
  getUserTweetCount,
  getUserUserName,
  getUserLocation,
  getTimestamp,
  addFollower,
} from "../api/Data";
import { getUserProfilePic, getUserCoverPic } from "../api/Data";

import { selectUserId, selectCurrentUserObject } from "../redux/userSlice.js";

export default function UserProfile(props) {
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const [userUserName, setUserUserName] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState("test");
  const [userDescription, setUserDescription] = useState(null);
  const [userFollowersLength, setUserFollowersLength] = useState(null);
  const [userFollowingLength, setUserFollowingLength] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const [tweetCount, setTweetCount] = useState(0);
  const [location, setLocation] = useState("test");
  const [joinedDate, setJoinedDate] = useState("Joined October 2020");

  const displayUserId = useSelector(selectUserId);
  const displayCurrentUserObject = useSelector(selectCurrentUserObject);
  const { username } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      setUserExists(await checkExistingUser(username));
    };
    checkUser();
  }, []);

  useEffect(() => {
    async function setPictures() {
      setProfilePic(await getUserProfilePic(username));
      setCoverPic(await getUserCoverPic(username));
    }
    async function setUserName() {
      setUserDisplayName(await getUserDisplayName(username));
    }
    async function setUserTweetCount() {
      setTweetCount(await getUserTweetCount(username));
    }
    async function setDescription() {
      setUserDescription(await getUserDescription(username));
    }
    async function setUserLocation() {
      setLocation(await getUserLocation(username));
    }
    async function setUserTimestamp() {
      let temp = await getTimestamp(username);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let fullDate = temp.toDate().toLocaleDateString("en-GB", options);
      let splitDate = fullDate.split(" ");
      let shortDate = splitDate[2] + " " + splitDate[3];
      setJoinedDate(shortDate);
    }
    setPictures();
    setUserName();
    setUserTweetCount();
    setDescription();
    setUserLocation();
    setUserTimestamp();
  }, [userExists]);

  if (userExists != false) {
    return (
      <div>
        <div className="header-wrapper">
          <div className="header-header">
            <p id="header-backarrow" onClick={() => navigate("/")}>
              &#8592;
            </p>
            {/* <p id="header-userName">{getUserDisplayName(displayUserId)}</p> */}
            <p id="header-userName">{userDisplayName}</p>
            <div id="header-tweetCount">{tweetCount} posts</div>
          </div>
          <div className="header-section">
            <img src={coverPic} id="header-coverPicture"></img>
            <img src={profilePic} id="header-profilePicture"></img>
            <div className="header-buttons-section">
              {" "}
              <img className="header-button" src={moreInfoIcon}></img>
              <img
                className="header-button"
                src={messagesIcon}
                onClick={() => addFollower("rodolphe931", "adrien")}
              ></img>
              <img
                className="header-button"
                src={addNotificationsIcon}
                onClick={() =>
                  console.log(typeof joinedDate + " : " + joinedDate)
                }
              ></img>
              <div id="followingButton">Following</div>
              {/* //make this line depending on a variable */}
            </div>
          </div>
        </div>
        <div className="header-main-wrapper">
          <div id="header-main-userName">{userDisplayName}</div>
          <div id="header-main-userId">@{username}</div>
          <div id="header-description">{userDescription}</div>
          <div id="header-main-details">
            <div>Science & Technology</div>
            <div>{location}</div>
            <div>Joined {joinedDate}</div>
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
        <UserTweets user={username} />
      </div>
    );
  } else {
    return <div>"user doesn't exist"</div>;
  }
}
