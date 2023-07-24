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
import { db } from "../api/Firebase";
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
      case 5:
        navigate("/");
      default:
        return <div>Default</div>;
    }
  }

  return (
    <div className="createAccountWrapper">
      <img src={twitterLogo} id="twitterLogo"></img>
      {renderStep(handleNext)}
    </div>
  );
}
