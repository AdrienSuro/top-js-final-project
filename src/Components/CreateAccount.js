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
import { db } from "./Firebase";
import { selectUserId, selectUserDisplayName } from "./userSlice.js";
import { useNavigate } from "react-router-dom";

export default function CreateAccount(user) {
  const displayUserId = useSelector(selectUserId);
  const displayUserDisplayName = useSelector(selectUserDisplayName);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  function handleNext(data) {
    switch (step) {
      case 1:
    }
    setStep(step + 1);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <div>Display Name</div>;
    }
  }

  function createUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const displayName = document.getElementById("displayname").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;

    if (username && displayName && description && location) {
      // All required fields are filled, proceed with account creation
      setDoc(doc(db, "users", displayUserId), {
        accountCreated: new Date(),
        userName: username,
        displayName: displayName,
        description: description,
        location: location,
      });

      navigate("/");
    } else {
      // Show an error message or perform any other required validation logic
      alert("Please fill in all required fields.");
    }
  }

  return (
    <div>
      <h1>Twitter Logo</h1>
      {renderStep()}
    </div>
  );
}
