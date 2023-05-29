import React from "react";
import { useSelector } from "react-redux";
import { selectTweets } from "./userSlice.js";

export default function User() {
  const tweets = useSelector(selectTweets);

  return (
    <div>
      <ul>
        {tweets.map((tweet) => (
          <li>{tweet}</li>
        ))}
      </ul>
    </div>
  );
}
