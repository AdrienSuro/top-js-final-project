import React from "react";
import {
  selectUserId,
  selectUserDisplayName,
  setUserDisplayName,
} from "../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkExistingUser, checkExistingEmail } from "../api/Data.js";

export default function SignUpSteps(props) {
  const { step, handleNext } = props;
  const displayUserId = useSelector(selectUserId);
  const displayUserDisplayName = useSelector(selectUserDisplayName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setUserDisplayName(event.target.value));
  };

  switch (step) {
    case "displayName":
      return (
        <div className="createAccountContent">
          <h2>How do you want to be called ?</h2>
          <p>You can always modify this later.</p>
          <div className="formWrapper">
            <label for="displayname">Display Name</label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              value={displayUserDisplayName}
              onChange={handleChange}
            ></input>
          </div>
          <button
            onClick={() => {
              handleNext(document.getElementById("displayName").value);
              document.getElementById("displayName").value = null;
            }}
            id="nextButton"
          >
            Next
          </button>
        </div>
      );
    case "userName":
      return (
        <div className="createAccountContent">
          <h2>Define your user ID.</h2>
          <p>This is how others will refer to you. It will never change.</p>
          <div className="formWrapper">
            <label for="userName">User ID</label>
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={async (event) => {
                let userExists = await checkExistingUser(event.target.value);
                if (userExists === true) {
                  alert("userId already taken!");
                }
              }}
            ></input>
          </div>
          <button
            onClick={async () => {
              let userExists = await checkExistingUser(
                document.getElementById("userName").value
              );
              if (userExists === true) {
                alert("User ID already taken !");
              } else if (userExists !== true) {
                handleNext(document.getElementById("userName").value);
                document.getElementById("userName").value = null;
              }
            }}
            id="nextButton"
          >
            Next
          </button>
        </div>
      );

    case "userLocation":
      return (
        <div className="createAccountContent">
          <h2>Set your location.</h2>
          <div className="formWrapper">
            <label for="userLocation">Location</label>
            <input type="text" name="userLocation" id="userLocation"></input>
          </div>
          <button
            onClick={() => {
              handleNext(document.getElementById("userLocation").value);
              document.getElementById("userLocation").value = null;
            }}
            id="nextButton"
          >
            Next
          </button>
        </div>
      );
    case "userDescription":
      return (
        <div className="createAccountContent">
          <h2>Say a few words about you.</h2>
          <div className="formWrapper">
            <label for="userDescription">Description</label>
            <input
              type="text"
              name="userDescription"
              id="userDescription"
            ></input>
          </div>
          <button
            onClick={() => {
              handleNext(document.getElementById("userDescription").value);
              document.getElementById("userDescription").value = null;
            }}
            id="nextButton"
          >
            Next
          </button>
        </div>
      );
    case "userEmail":
      return (
        <div className="createAccountContent">
          <h2>Enter your email</h2>
          <div className="formWrapper">
            <label for="userEmail">Email</label>
            <input type="text" name="userEmail" id="userEmail"></input>
          </div>
          <button
            onClick={async () => {
              let emailExists = await checkExistingEmail(
                document.getElementById("userEmail").value
              );
              if (emailExists === true) {
                alert("email already exists !!");
              } else if (emailExists !== true) {
                handleNext(document.getElementById("userEmail").value);
                document.getElementById("userEmail").value = null;
              }
            }}
            id="nextButton"
          >
            Next
          </button>
        </div>
      );
    case "userPassword":
      return (
        <div className="createAccountContent">
          <h2>Enter your password</h2>
          <div className="formWrapper">
            <label for="userPassword">Password</label>
            <input type="text" name="userPassword" id="userPassword"></input>
          </div>
          <button
            onClick={() => {
              handleNext(document.getElementById("userPassword").value);
              document.getElementById("userPassword").value = null;
            }}
            id="nextButton"
          >
            Next
          </button>
        </div>
      );
    default:
      return <div>"Looking forward to the Weekend"</div>;
  }
}
