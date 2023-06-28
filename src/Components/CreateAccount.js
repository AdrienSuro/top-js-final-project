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
import { selectUserId, selectUserDisplayName } from "./userSlice.js";
import { useNavigate } from "react-router-dom";

export default function CreateAccount(user) {
  const displayUserId = useSelector(selectUserId);
  const displayUserDisplayName = useSelector(selectUserDisplayName);
  const navigate = useNavigate();

  function createUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const displayName = document.getElementById("displayname").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;

    if (username && displayName && description && location) {
      // All required fields are filled, proceed with account creation
      setDoc(doc(db, "users", displayUserId), {
        accountCreated: new Date(),
        userName: username,
        displayName: displayName,
        description: description,
        location: location,
      });

      navigate("/");
    } else {
      // Show an error message or perform any other required validation logic
      alert("Please fill in all required fields.");
    }
  }

  return (
    <div>
      <h1>Hi {displayUserDisplayName} !</h1>
      <h2>
        Fill in the following fields to set up an account and explore Twitter !
      </h2>
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
