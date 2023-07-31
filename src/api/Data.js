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

// Simple query example :
// const q = query(citiesRef, where("state", "==", "CA"));

export async function getOwnTweets(userName) {
  const tweetsRef = collection(db, "tweets");
  const q = query(tweetsRef, where("userName", "==", userName));
  const querySnapshot = await getDocs(q);
  const tweets = [];
  querySnapshot.forEach((doc) => {
    tweets.push(doc.data());
  });
  tweets.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
  return tweets;
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

export async function returnExistingUser(userName) {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    if (doc.id === userName) {
      return userName;
    } else return false;
  });
}

export async function checkExistingUser(id) {
  let userExists = false;
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id);
    if (doc.id === id) {
      userExists = true;
    }
  });
  return userExists;
}

// ******* WRITE ******* //

export function createNewUser(userObject) {
  console.log("inside Data.js");
  console.log(userObject);
  // MODIFY "testUser" argument and use variable !!!
  setDoc(doc(db, "users", userObject.uid), {
    userName: userObject.userName,
    displayName: userObject.displayName,
    description: userObject.description,
    location: userObject.location,
    followers: [],
    following: [],
    pictureId: null,
    timestamp: new Date(),
  });
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

export function retweet(userName, reference) {
  //userName will be taken locally, from the userSlice
  //reference will be taken from the actual tweet
  return;
}
