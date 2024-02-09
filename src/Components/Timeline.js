import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import "firebase/firestore";
import { selectIsLoggedIn } from "../redux/userSlice";
import WriteTweet from "./WriteTweet";
import TweetList from "./TweetList";

export default function Timeline() {
  const [following, setFollowing] = useState(false);

  const displayIsLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      {" "}
      <h1>Home</h1>
      <div className="chooseTimeline">
        <h3
          onClick={() => {
            setFollowing(false);
          }}
        >
          For you
        </h3>
        <h3
          onClick={() => {
            setFollowing(true);
          }}
        >
          Following
        </h3>
      </div>
      {displayIsLoggedIn ? <WriteTweet /> : null}
      <TweetList following={following} />
    </div>
  );
}
