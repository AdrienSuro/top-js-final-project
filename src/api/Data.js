// ******* IMPORTS ******* //
import { v4 as uuidv4 } from "uuid";
import { db, getProfilePicUrl } from "../api/Firebase";
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

// ******* READ ******* //

export function getOwnTweets(userName) {
  //will get user Tweets
}

export function getRetweets(userName) {
  //will get user Tweets
}

export function getOwnTweetsAndRetweets(userName) {
  // will get both Tweets and Retweets
}

export function getProfileData(userName) {
  // will get user Info as an object
}

export function getTimeline(userName) {
  return;
}

export function getUserDisplayName(userName) {
  return;
}

// ******* WRITE ******* //

export function createNewUser(userObject) {
  // will create a New User
}

export function changeUserDescription(userName, newDescription) {
  return;
}

export function changeUserLocation(userName, newLocation) {
  return;
}

export function changeUserDisplayName(userName, newDisplayName) {
  return;
}

export function addTweet(userName, content) {
  let randomIdentifier = uuidv4();
  setDoc(doc(db, "tweets", randomIdentifier), {
    content: content,
    userName: userName,
    displayName: getUserDisplayName(userName),
    timestamp: new Date(),
    comments: 0,
    retweets: 0,
    likes: 0,
    stats: 0,
    docId: randomIdentifier,
  });
  return;
}

function uploadTweet() {
  const tweetContentField = document.getElementById("tweetContentField");
  let randomIdentifier = uuidv4();
  setDoc(doc(db, "tweets", randomIdentifier), {
    content: tweetContentField.value,
    userName: "AdrienSuro",
    displayName: "Anonym User",
    timestamp: new Date(),
    comments: getRandomNum(),
    retweets: getRandomNum(),
    likes: getRandomNum(),
    stats: getRandomNum(),
    docId: randomIdentifier,
  });
  tweetContentField.value = "";
}

export function retweet(userName, reference) {
  //userName will be taken locally, from the userSlice
  //reference will be taken from the actual tweet
  return;
}
