import React from "react";
import { selectUserId, selectUserDisplayName } from "./userSlice.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignUpSteps(props) {
  const { step, handleNext } = props;
  const displayUserId = useSelector(selectUserId);
  const displayUserDisplayName = useSelector(selectUserDisplayName);
  const navigate = useNavigate();

  const addUserData = (data) => {
    handleNext(data);
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
            ></input>
          </div>
          <button
            onClick={() =>
              handleNext(document.getElementById("displayName").value)
            }
          >
            Next
          </button>
        </div>
      );
    case "userName":
      return (
        <div>
          <label for="userName">User Name:</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={displayUserId}
          ></input>
          <button
            onClick={() =>
              handleNext(document.getElementById("userName").value)
            }
          >
            Next
          </button>
        </div>
      );
    case "userLocation":
      return (
        <div>
          <label for="location">Location :</label>
          <input type="text" name="location" id="location"></input>
          <button
            onClick={() =>
              handleNext(document.getElementById("location").value)
            }
          >
            Next
          </button>
        </div>
      );
    case "userDescription":
      return (
        <div>
          <label for="userDescription">Description :</label>
          <input type="text" name="description" id="description"></input>
          <button
            onClick={() => {
              handleNext(document.getElementById("location").value);
              navigate("/");
            }}
          >
            Done !
          </button>
        </div>
      );
    default:
      return <div>"Looking forward to the Weekend"</div>;
  }
}
