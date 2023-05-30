import React from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import mainLogoImg from "../icons/main-logo.png";
import homeImg from "../icons/home.png";
import exploreImg from "../icons/hashtag.png";
import notificationsImg from "../icons/notification.png";
import messagesImg from "../icons/messages.png";
import listsImg from "../icons/lists.png";
import bookmarksImg from "../icons/bookmark.png";
import profileImg from "../icons/profile.png";

export default function SideNavbar() {
  return (
    <div>
      <div className="sideNavbar">
        <div>
          <img src={mainLogoImg}></img>
          <p></p>
        </div>
        <div>
          {" "}
          <img src={homeImg}></img>
          <p>Home</p>
        </div>
        <div></div>
        <div>
          {" "}
          <img src={exploreImg}></img>
        </div>
        <div></div>
        <div>
          {" "}
          <img src={notificationsImg}></img>
        </div>
        <div></div>
        <div>
          {" "}
          <img src={messagesImg}></img>
        </div>
        <div></div>
      </div>
    </div>
  );
}
