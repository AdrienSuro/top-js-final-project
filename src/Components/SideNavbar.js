import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/userSlice";

export default function SideNavbar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // This is commented out because it was only showing
  // "Search" if user wasn't logged in.
  // It was getting on my nerves to see the app so incomplete
  //
  // if (isLoggedIn) {
  return (
    <div>
      <div className="sideNavbar">
        <div className="sideNavBarCat">
          <img src={mainLogoImg}></img>
          <p></p>
        </div>
        <Link style={{ textDecoration: "none" }} className="homeLink" to="/">
          <div>
            {" "}
            <img src={homeImg}></img>
            <p>Home</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="homeLink"
          to="/userprofile"
        >
          <div>
            {" "}
            <img src={exploreImg}></img>
            <p>Search</p>
          </div>
        </Link>

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
      ,
    </div>
  );
  // }
  // return (
  //     <div>
  //       <div className="sideNavbar">
  //         <p>No logged in User</p>
  //         <div className="sideNavBarCat">
  //           <img src={mainLogoImg}></img>
  //           <p></p>
  //         </div>
  //         <Link
  //           style={{ textDecoration: "none" }}
  //           className="homeLink"
  //           to="/userprofile"
  //         >
  //           <div>
  //             {" "}
  //             <img src={exploreImg}></img>
  //             <p>Search</p>
  //           </div>
  //         </Link>
  //       </div>
  //     </div>
  //   )
  // }
}
