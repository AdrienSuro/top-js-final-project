import React from "react";
import { useSelector, useDispatch } from "react-redux";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import "firebase/firestore";
import { selectName, selectIsLoggedIn } from "../redux/userSlice";
import WriteTweet from "./WriteTweet";
import TweetList from "./TweetList";

import { firebase } from "firebase/app";
import {
  doc,
  setDoc,
  deleteDoc,
  querySnapshot,
  query,
  where,
  collection,
  getDocs,
  docRef,
} from "firebase/firestore";

import { db, getUserName, getProfilePicUrl } from "../api/Firebase";
import { v4 as uuidv4 } from "uuid";

export default function Timeline() {
  return (
    <div>
      {" "}
      <h1>Home</h1>
      <div className="chooseTimeline">
        <h3>For you</h3>
        <h3>Following</h3>
      </div>
      <WriteTweet />
      <TweetList />
    </div>
  );
}
