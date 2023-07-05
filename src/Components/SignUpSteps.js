import React from "react";

export default function SignUpSteps(props) {
  const { step, handleNext } = props;

  const addUserData = (data) => {
    handleNext(data);
  };

  switch (step) {
    case "displayName":
      return (
        <div>
          <label for="displayname">Display Name:</label>
          <input type="text" name="displayName" id="displayName"></input>
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
          <h1>User Name</h1>
          <button onClick={handleNext}>Next</button>
        </div>
      );
    case "birthDate":
      return <div>Birth Date</div>;
    default:
      return <div>"Looking forward to the Weekend"</div>;
  }
}
