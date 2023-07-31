import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connectWithEmail, connectWithGoogle } from "../api/Login";

export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={connectWithGoogle()}>Connect with Google</button>
      <h1>OR</h1>
      <input type="text" name="emailField" id="emailField"></input>
      <input type="text" name="passwordField" id="passwordField"></input>
      <button
        onClick={connectWithEmail(
          document.getElementById("emailField"),
          document.getElementById("passwordField")
        )}
      >
        Connect with Email
      </button>
    </div>
  );
}
