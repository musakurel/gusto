import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import { Layout } from "antd";
import { User } from "../../types/entities";

const { Header } = Layout;

const Navigation = ({ user }: {user:User}) => {
  const logout = () => {
    window.open(`${process.env.REACT_APP_BE_HOST}auth/logout`, "_self");
  };

  console.log(user)
  return (
    <nav className="navbar">
      <span className="logo">
        <Link className="link" to="/movies">
        <img className="logo-img" src="/logo.png" alt="" />


        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="link">
            <img
              src={
                user.imageUrl ? user.imageUrl : "/user.png"
              }
              alt=""
              className="avatar"
            />
          </li>
          <li>
              {user.firstName+ " "+user.lastName}
            
          </li>
          
          <li>
            <a className="link" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="list">
          <li>
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="link" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
