import React from "react";

export default function SignUpSteps(props) {
  const { step, handleNext } = props;

  switch (step) {
    case "displayName":
      return (
        <div>
          <h1>Display Name</h1>
          <button onClick={handleNext}>Next</button>
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
