import "./dashboard.css";

import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const context = useContext(UserContext);
  const user = context;

  const [password, setPassword] = useState<string>();
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [email, setEmail] = useState<string>();
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [lastName, setLastName] = useState<string>();
  const lastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const [firstName, setFirsName] = useState<string>();
  const firstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirsName(e.target.value);
  };
  const navigate = useNavigate();

  const config = { headers: { "Content-Type": "application/json" } };

  const handleSubmit = (itm: number) => {
    axios
      .put(
        `${process.env.REACT_APP_BE_HOST}users/${itm}`,
        {
          email: email,
          lastName: lastName,
          firstName: firstName,
          password: password,
        },
        config
      )
      .then(function (response) {
        console.log(response);
        window.open("/movies", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
    window.open("/movies", "_self");
  };

  const deleteAccount = (itm: number) => {
    axios
      .delete(`${process.env.REACT_APP_BE_HOST}users/${itm}`)
      .then(function (response) {
        window.open(`${process.env.REACT_APP_BE_HOST}auth/logout`, "_self");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/login");
  };

  return (
    <div className="form">
      <h1 className="header">Update Your Profile</h1>
      <form onSubmit={() => handleSubmit(user.id)}>
        <input
          type="text"
          onChange={firstNameChange}
          name="firstName"
          placeholder="First name"
          defaultValue={user.firstName}
        />
        <input
          type="text"
          onChange={lastNameChange}
          name="lastName"
          placeholder="Last Name"
          defaultValue={user.lastName}
        />
        <input
          type="text"
          onChange={emailChange}
          name="email"
          placeholder="Email"
          defaultValue={user.email}
        />
        <input
          type="text"
          onChange={passwordChange}
          name="password"
          placeholder="Password"
        />
        <input className="submit" type="submit" />
      </form>

      <button onClick={() => deleteAccount(user.id)} className="delete">
        {" "}
        Delete Your Account{" "}
      </button>
    </div>
  );
};

export default UpdateProfile;
