import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import coverPictureImg from "../img/testCover.jpg";
import profilePicImg from "../img/me.png";
import moreInfoIcon from "../icons/threedots.png";
import messagesIcon from "../icons/messages.png";
import addNotificationsIcon from "../icons/activateNotifications.png";
import TweetList from "./TweetList";
import { useState } from "react";
import {
  selectIsLoggedIn,
  selectUserName,
  selectDisplayName,
  selectDescription,
  toggleIsLoggedIn,
  checkLoggedIn,
  setDisplayName,
  setUserName,
  setDescription,
} from "./userSlice.js";
import { db, getUserDisplayName } from "./Firebase";
import {
  getFirestore,
  query,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";

//user doit être un objet avec toutes les props nécessaires
//qu'il soit invoqué comme activeUser ou juste comme lien
// sur l'auteur d'un tweet
export default function UserProfile(username) {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const displayName = useSelector(selectDisplayName);
  const userName = useSelector(selectUserName);
  const userDescription = useSelector(selectDescription);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Avoir ici un objet qui contient toutes les informations nécessaires
  // pour créer n'importe quel profil d'utilisateur.
  // on l'invoquera ainsi < UserProfile name="userName" />
  // Dans le cas de l'utilisateur actif on fera de même.

  function getUserDescription(username) {
    onSnapshot(doc(db, "users", username), (doc) => {
      setUser(doc.data().description);
    });
  }

  useEffect(() => {
    getUserDescription("Charles_0001");
  }, []);

  return (
    <div>
      <div className="header-wrapper">
        <div className="header-header">
          <p id="header-backarrow">&#8592;</p>
          <p id="header-userName">{userName}</p>
          <div id="header-tweetCount">26.8K Tweets</div>
        </div>
        <div className="header-section">
          <img src={coverPictureImg} id="header-coverPicture"></img>
          <img src={profilePicImg} id="header-profilePicture"></img>
          <div class="header-buttons-section">
            {" "}
            <img
              class="header-button"
              src={moreInfoIcon}
              onClick={() => dispatch(setDescription())}
            ></img>
            <img class="header-button" src={messagesIcon}></img>
            <img class="header-button" src={addNotificationsIcon}></img>
            <div id="followingButton">Following</div>
          </div>
        </div>
      </div>
      <div className="header-main-wrapper">
        <div id="header-main-userName">{userName}</div>
        <div id="header-main-userId">@{userName}</div>
        <div id="header-description">{user}</div>
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
      <TweetList user={userName} />
    </div>
  );
}
