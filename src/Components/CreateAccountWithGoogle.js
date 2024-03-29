import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId, selectLoginType } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import SignUpSteps from "./SignUpSteps";
import twitterLogo from "../icons/main-logo.png";
import { createNewUser } from "../api/Data";

export default function CreateAccountWithGoogle(user) {
  const displayUserId = useSelector(selectUserId);
  const loginType = useSelector(selectLoginType);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userObjectComplete, setUserObjectComplete] = useState(false);
  const [userObject, setUserObject] = useState({
    uid: displayUserId,
    displayName: null,
    userName: null,
    location: null,
    description: null,
    email: null,
    password: null,
  });

  useEffect(() => {
    if (userObjectComplete === true) {
      createNewUser(userObject);
      navigate("/");
    }
  }, [userObjectComplete]);

  function addData(data) {
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
        if (loginType === "google") {
          setUserObjectComplete(true);
        }
        break;
      case 5:
        setUserObject({
          ...userObject,
          email: data,
          uid: data,
        });
        break;
      case 6:
        setUserObject({
          ...userObject,
          password: data,
        });
        if (loginType === "email") {
          setUserObjectComplete(true);
        }
        break;
      default:
        return;
    }
    setStep(step + 1);
    console.log(userObject);
  }

  // TO DO : renderStep should only return component, no side effects !!!
  function renderStep(handleNext) {
    switch (step) {
      case 1:
        return <SignUpSteps step="displayName" handleNext={addData} />;
      case 2:
        return <SignUpSteps step="userName" handleNext={addData} />;
      case 3:
        return <SignUpSteps step="userLocation" handleNext={addData} />;
      case 4:
        return <SignUpSteps step="userDescription" handleNext={addData} />;
      case 5:
        return <SignUpSteps step="userEmail" handleNext={addData} />;
      case 6:
        return <SignUpSteps step="userPassword" handleNext={addData} />;
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
      {renderStep(addData)}
    </div>
  );
}
