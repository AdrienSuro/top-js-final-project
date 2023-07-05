import React from "react";

export default function SignUpSteps(props) {
  const { step } = props;

  switch (step) {
    case "displayName":
      return <div>Display Name</div>;
    case "userName":
      return <div>User Name</div>;
    case "birthDate":
      return <div>Birth Date</div>;
    default:
      return <div>"Looking forward to the Weekend"</div>;
  }
}
