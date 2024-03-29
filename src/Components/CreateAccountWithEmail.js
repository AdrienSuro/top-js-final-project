import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId, selectLoginType } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import SignUpSteps from "./SignUpSteps";
import twitterLogo from "../icons/main-logo.png";
import { createNewUser } from "../api/Data";
import { createUserWithEmail } from "../api/Firebase.js";

export default function CreateAccountWithEmail(user) {
  const displayUserId = useSelector(selectUserId);
  const loginType = useSelector(selectLoginType);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userObjectComplete, setUserObjectComplete] = useState(false);
  const [userObject, setUserObject] = useState({
    userId: null,
    displayName: null,
    location: null,
    description: null,
    email: null,
    password: null,
  });

  useEffect(() => {
    if (userObjectComplete === true) {
      createUserWithEmail(userObject.email, userObject.password);
      createNewUser(userObject);
      navigate("/");
    }
  }, [userObjectComplete]);

  function addData(data) {
    switch (step) {
      case 1:
        setUserObject({
          ...userObject,
          email: data,
        });
        break;
      case 2:
        setUserObject({
          ...userObject,
          password: data,
        });
        break;
      case 3:
        setUserObject({
          ...userObject,
          displayName: data,
        });
        break;
      case 4:
        setUserObject({
          ...userObject,
          userId: data,
        });
        break;
      case 5:
        setUserObject({
          ...userObject,
          location: data,
        });
        break;
      case 6:
        setUserObject({
          ...userObject,
          description: data,
        });
        setUserObjectComplete(true);
        break;
      default:
        return;
    }
    setStep(step + 1);
  }

  function renderStep(handleNext) {
    switch (step) {
      case 1:
        return <SignUpSteps step="userEmail" handleNext={addData} />;
      case 2:
        return <SignUpSteps step="userPassword" handleNext={addData} />;
      case 3:
        return <SignUpSteps step="displayName" handleNext={addData} />;
      case 4:
        return <SignUpSteps step="userName" handleNext={addData} />;
      case 5:
        return <SignUpSteps step="userLocation" handleNext={addData} />;
      case 6:
        return <SignUpSteps step="userDescription" handleNext={addData} />;
      default:
        return <div>Default</div>;
    }
  }

  return (
    <div className="createAccountWrapper">
      <img src={twitterLogo} id="twitterLogo"></img>
      {renderStep(addData)}
    </div>
  );
}
