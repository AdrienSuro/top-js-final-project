import React, { useState } from "react";
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
import SignUpSteps from "./SignUpSteps";
import twitterLogo from "../icons/main-logo.png";

export default function CreateAccount(user) {
  const displayUserId = useSelector(selectUserId);
  const displayUserDisplayName = useSelector(selectUserDisplayName);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  let accountCreated = null;
  let userName = null;
  let userDisplayName = displayUserDisplayName;
  let userDescription = null;
  let userLocation = null;

  function handleNext(data) {
    switch (step) {
      case 1:
        userDisplayName = data;
        break;
      case 2:
        userName = data;
        break;
      case 3:
        userLocation = data;
        break;
      case 4:
        userDescription = data;
        break;
    }
    setStep(step + 1);
    console.log(userDisplayName);
  }

  function renderStep(handleNext) {
    switch (step) {
      case 1:
        return <SignUpSteps step="displayName" handleNext={handleNext} />;
      case 2:
        return <SignUpSteps step="userName" handleNext={handleNext} />;
      case 3:
        return <SignUpSteps step="userLocation" handleNext={handleNext} />;
      case 4:
        return <SignUpSteps step="userDescription" handleNext={handleNext} />;
      default:
        return <div>Default</div>;
      // THIS SHOUDL REDIRECT USER TO MAIN PAGE
    }
  }

  //   function createUser(event) {
  //     event.preventDefault();

  //     const username = document.getElementById("username").value;
  //     const displayName = document.getElementById("displayname").value;
  //     const description = document.getElementById("description").value;
  //     const location = document.getElementById("location").value;

  //     if (username && displayName && description && location) {
  //       // All required fields are filled, proceed with account creation
  //       setDoc(doc(db, "users", displayUserId), {
  //         accountCreated: new Date(),
  //         userName: username,
  //         displayName: displayName,
  //         description: description,
  //         location: location,
  //       });

  //       navigate("/");
  //     } else {
  //       // Show an error message or perform any other required validation logic
  //       alert("Please fill in all required fields.");
  //     }
  //   }

  return (
    <div className="createAccountWrapper">
      <img src={twitterLogo} id="twitterLogo"></img>
      {renderStep(handleNext)}
    </div>
  );
}
