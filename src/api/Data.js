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
  getDoc,
  docRef,
  onSnapshot,
} from "firebase/firestore";
import firebaseConfig from "./FirebaseConfig";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const storageRef = ref(storage);

// ******* READ ******* //

// Simple query example :
// const q = query(citiesRef, where("state", "==", "CA"));

export async function getOwnTweets(userId) {
  const tweetsRef = collection(db, "tweets");
  const q = query(tweetsRef, where("userName", "==", userId));
  const querySnapshot = await getDocs(q);
  const tweets = [];
  querySnapshot.forEach((doc) => {
    tweets.push(doc.data());
  });
  tweets.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
  return tweets;
}

export function getRetweets(userId) {
  //will get user Tweets
}

export function getOwnTweetsAndRetweets(userId) {
  // will get both Tweets and Retweets
}

export function getProfileData(userId) {
  // will get user Info as an object
}

export function getTimeline(userId) {
  return;
}

export function getUserDisplayName(userId) {
  const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
    console.log("Current data: ", doc.data());
    console.log(doc.data().displayName);
    return doc.data().displayName;
  });
}

export function getUserUserName(userId) {
  return;
}

export function getUserLocation(userId) {
  return;
}

export function getUserDescription(userId) {
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
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}

export async function getUserIdWithEmail(email) {
  let result = null;
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    if (doc.data().email === email) {
      result = doc.id;
    }
  });
  return result;
}

export async function checkExistingEmail(email) {
  let emailExists = false;
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    if (doc.data().email === email) {
      emailExists = true;
    }
  });
  return emailExists;
}

export async function getUserProfilePic(userId) {
  const path = "userProfilePic/" + userId + ".png";
  const userProfilePicRef = ref(storage, path);
  try {
    const url = await getDownloadURL(userProfilePicRef);
    console.log(url);
    return url;
  } catch (error) {
    console.error(error.code);
    return null;
  }
}

// ******* WRITE ******* //

export function createNewUser(userObject) {
  console.log("inside Data.js");
  console.log(userObject);
  // MODIFY "testUser" argument and use variable !!!
  setDoc(doc(db, "users", userObject.userId), {
    userId: userObject.userId,
    displayName: userObject.displayName,
    description: userObject.description,
    location: userObject.location,
    followers: [],
    following: [],
    pictureId: null,
    timestamp: new Date(),
    email: userObject.email,
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
