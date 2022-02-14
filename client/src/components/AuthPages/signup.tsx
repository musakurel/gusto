import React from "react";
import "./auth.css";

// We are sendin our request to backend with this form and catch with req.body
function CreateButterfly() {
  return (
    <div className="form">
      <h1 className="header">Signup</h1>
      <form method="POST" action={process.env.REACT_APP_BE_HOST + "signup"}>
        <input type="text" name="firstName" placeholder="First name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="text" name="email" placeholder="Email" />
        <input type="text" name="password" placeholder="Password" />
        <input className="submit" type="submit" />
      </form>
    </div>
  );
}

export default CreateButterfly;
