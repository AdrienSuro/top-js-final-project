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
        <div className="sideNavBarCat">
          <img src={mainLogoImg}></img>
          <p></p>
        </div>
        <div>
          {" "}
          <img src={homeImg}></img>
          <p>Home</p>
        </div>
        <div>
          {" "}
          <img src={exploreImg}></img>
          <p>Search</p>
        </div>
        <div>
          {" "}
          <img src={notificationsImg}></img>
          <p>Notifications</p>
        </div>
        <div>
          {" "}
          <img src={messagesImg}></img>
          <p>Messages</p>
        </div>
        <div>
          {" "}
          <img src={listsImg}></img>
          <p>Lists</p>
        </div>
        <div>
          {" "}
          <img src={bookmarksImg}></img>
          <p>Bookmarks</p>
        </div>
        <div>
          {" "}
          <img src={profileImg}></img>
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
}
