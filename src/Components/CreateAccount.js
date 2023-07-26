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
import { createNewUser } from "../api/Data";

export default function CreateAccount(user) {
  const displayUserId = useSelector(selectUserId);
  const displayUserDisplayName = useSelector(selectUserDisplayName);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  let userDisplayName = displayUserDisplayName;
  const [userObject, setUserObject] = useState({
    uid: displayUserId,
    displayName: null,
    userName: null,
    location: null,
    description: null,
  });

  function handleNext(data) {
    switch (step) {
      case 1:
        setUserObject({
          ...userObject,
          displayName: data,
        });
        break;
      case 2:
        setUserObject({
          ...userObject,
          userName: data,
        });
        break;
      case 3:
        setUserObject({
          ...userObject,
          location: data,
        });
        break;
      case 4:
        setUserObject({
          ...userObject,
          description: data,
        });
        break;
      default:
        return;
    }
    setStep(step + 1);
    console.log(userObject);
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
        createNewUser(userObject);
        navigate("/");
        break;
      default:
        return <div>Default</div>;
    }
  }

  return (
    <div className="createAccountWrapper">
      <img
        src={twitterLogo}
        id="twitterLogo"
        onClick={() => {
          console.log(userObject);
        }}
      ></img>
      {renderStep(handleNext)}
    </div>
  );
}
