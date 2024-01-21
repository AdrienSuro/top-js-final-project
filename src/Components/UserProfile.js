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
import { checkExistingUser, getUserDisplayName } from "../api/Data";
import { getUserProfilePic } from "../api/Data";

import { selectUserId, selectCurrentUserObject } from "../redux/userSlice.js";

export default function UserProfile(props) {
  const [profilePic, setProfilePic] = useState("");
  const [userUserName, setUserUserName] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [userFollowersLength, setUserFollowersLength] = useState(null);
  const [userFollowingLength, setUserFollowingLength] = useState(null);
  const [userExists, setUserExists] = useState(false);

  const displayUserId = useSelector(selectUserId);
  const displayCurrentUserObject = useSelector(selectCurrentUserObject);
  const { username } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("inside useEffect in UserProfile");
    console.log("userExists value is " + userExists);
    const checkUser = async () => {
      setUserExists(await checkExistingUser(username));
      console.log("userExists value is " + userExists);
    };
    checkUser();
    // if (userExists != false) {
    //   const fetchImage = async () => {
    //     try {
    //       const userId = displayUserId; // Replace with your image name or path
    //       const url = await getUserProfilePic(userId);
    //       setProfilePic(url);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };
    //   fetchImage();
    // }
  }, []);

  useEffect(() => {
    async function metaSetProfilePic() {
      setProfilePic(await getUserProfilePic(username));
    }
    metaSetProfilePic();
  }, [userExists]);

  // function getUserUserName(userArg) {
  //   onSnapshot(doc(db, "users", userArg), (doc) => {
  //     setUserUserName(doc.data().userArg);
  //   });
  // }

  // function getUserDisplayName(userArg) {
  //   onSnapshot(doc(db, "users", userArg), (doc) => {
  //     setUserDisplayName(doc.data().displayName);
  //   });
  // }

  // function getUserDescription(userArg) {
  //   onSnapshot(doc(db, "users", userArg), (doc) => {
  //     setUserDescription(doc.data().description);
  //   });
  // }

  // function getUserFollowersLength(userArg) {
  //   onSnapshot(doc(db, "users", userArg), (doc) => {
  //     setUserFollowersLength(doc.data().followers.length);
  //     console.log("using ONSNAPSHOT");
  //   });
  // }

  // function getUserFollowingLength(userArg) {
  //   onSnapshot(doc(db, "users", userArg), (doc) => {
  //     setUserFollowingLength(doc.data().following.length);
  //   });
  // }
  if (userExists != false) {
    return (
      <div>
        <div className="header-wrapper">
          <div className="header-header">
            <p id="header-backarrow" onClick={() => navigate("/")}>
              &#8592;
            </p>
            {/* <p id="header-userName">{getUserDisplayName(displayUserId)}</p> */}
            <p id="header-userName">{displayCurrentUserObject.displayName}</p>
            <div id="header-tweetCount">26.8K Tweets</div>
          </div>
          <div className="header-section">
            <img src={coverPictureImg} id="header-coverPicture"></img>
            <img src={profilePic} id="header-profilePicture"></img>
            <div class="header-buttons-section">
              {" "}
              <img class="header-button" src={moreInfoIcon}></img>
              <img class="header-button" src={messagesIcon}></img>
              <img
                class="header-button"
                src={addNotificationsIcon}
                //onClick={getUserDisplayName(displayUserId)}
              ></img>
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
        <UserTweets />
      </div>
    );
  } else {
    return <div>"user doesn't exist"</div>;
  }
}
