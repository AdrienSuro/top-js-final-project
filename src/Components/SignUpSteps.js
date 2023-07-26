import React from "react";
import {
  selectUserId,
  selectUserDisplayName,
  setUserDisplayName,
} from "../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
          <h2>Define ayour username.</h2>
          <p>This one will never change.</p>
          <div className="formWrapper">
            <label for="userName">Username</label>
            <input type="text" name="userName" id="userName"></input>
          </div>
          <button
            onClick={() => {
              handleNext(document.getElementById("userName").value);
              document.getElementById("userName").value = null;
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
    default:
      return <div>"Looking forward to the Weekend"</div>;
  }
}
