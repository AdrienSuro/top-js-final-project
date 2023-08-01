import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connectWithEmail, connectWithGoogle } from "../api/Login";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login Page</h1>
      <button
        onClick={() => {
          connectWithGoogle();
          navigate("/");
        }}
      >
        Connect with Google
      </button>
      <h1>OR</h1>
      <input type="text" name="emailField" id="emailField"></input>
      <input type="text" name="passwordField" id="passwordField"></input>
      <button
        onClick={() => {
          connectWithEmail(
            document.getElementById("emailField").value,
            document.getElementById("passwordField").value
          );
          navigate("/");
        }}
      >
        Connect with Email
      </button>
      <hr></hr>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Homepage
      </button>
    </div>
  );
}
