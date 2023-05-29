import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectTweets,
  selectAge,
  incrementAge,
  selectIsLoggedIn,
} from "./userSlice.js";

export default function User() {
  const tweets = useSelector(selectTweets);
  const age = useSelector(selectAge);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        {tweets.map((tweet) => (
          <li>{tweet}</li>
        ))}
      </ul>
      {age}
      <button onClick={() => dispatch(incrementAge())}>Increment Age</button>
      {isLoggedIn ? "logged in" : "not logged in"}
    </div>
  );
}
