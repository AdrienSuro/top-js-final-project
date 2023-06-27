import React from "react";
import { useSelector } from "react-redux";

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

import { db } from "./Firebase";

import { selectUserId } from "./userSlice.js";

export default function CreateAccount(user) {
  const displayUserId = useSelector(selectUserId);

  function createUser() {
    setDoc(doc(db, "users", displayUserId), {
      accountCreated: new Date(),
      userName: document.getElementById("username").value,
      displayName: document.getElementById("displayname").value,
      description: document.getElementById("description").value,
      location: document.getElementById("location").value,
    });
  }

  return (
    <div>
      <h1>I will create a new account through a form !</h1>
      <form>
        <label for="username">Username:</label>
        <br></br>
        <input required type="text" name="username" id="username"></input>
        <br></br>
        <label for="displayname">Display Name:</label>
        <br></br>
        <input
          type="text"
          name="displayname"
          id="displayname"
          value={user.displayName}
          required
        ></input>
        <br></br>
        <label for="description">Description:</label>
        <br></br>
        <input type="text" name="description" id="description" required></input>
        <br></br>
        <label for="location">Location:</label>
        <br></br>
        <input type="text" name="location" id="location" required></input>
        <br></br>
        <button type="submit" value="submit" onClick={createUser}>
          Set Account
        </button>
      </form>
    </div>
  );
}
