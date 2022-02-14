import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "antd/dist/antd.css";
import { Layout, Row, Col } from "antd";

import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";
import Login from "./components/AuthPages/login";
import Signup from "./components/AuthPages/signup";
import Dashboard from "./components/Dashboard";
import AddMovie from "./components/Dashboard/addMovie";
import AddActor from "./components/Dashboard/addActor";
import Actors from "./components/App/Actors";
import Feed from "./components/App/Feed";
import YourMovies from "./components/Dashboard/YourMovies";

import { UserContext } from "./UserContext";
import YourActors from "./components/Dashboard/YourActors";
import UpdateProfile from "./components/Dashboard/UpdateProfile";
import UpdateMovie from "./components/Dashboard/UpdateMovie";
import UpdateActor from "./components/Dashboard/UpdateActor";
import { User } from "./types/entities";
import dotenv from "dotenv";

const axios = require("axios");
const { Content } = Layout;

const App = () => {
  let cookieValue = document.cookie.replace(
    /(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const [user, setUser] = useState();
  const [oAuthuser, SetOAuthuser] = useState();

  let loggedUser: User;
  if (user) {
    loggedUser = user;
  } else {
    loggedUser = oAuthuser as unknown as User;
  }

  useEffect(() => {
    async function getUser() {
      try {
        if (cookieValue) {
          const response = await axios.get(
            `${process.env.REACT_APP_BE_HOST}users/${cookieValue}`
          );
          if (response) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    const getOUser = () => {
      fetch(`${process.env.REACT_APP_BE_HOST}auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          SetOAuthuser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOUser();
  }, []);

  console.log(
    "this:",
    cookieValue,
    "user:",
    user,
    "OAUTHUSER:",
    oAuthuser,
    "loggeduser",
    loggedUser
  );

  const value = useMemo(() => loggedUser, [loggedUser]);
  return (
    <Router>
      <UserContext.Provider value={value}>
        <div className="App">
          <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout
              className="site-layout"
              style={{ backgroundColor: "#161d31" }}
            >
              <Content style={{ margin: "0 16px", backgroundColor: "none" }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  <Row
                    gutter={[32, 45]}
                    style={{ backgroundColor: "none", marginBottom: "32px" }}
                  >
                    <Col span={24}>
                      <header>
                        <Navigation user={loggedUser} />
                      </header>
                    </Col>

                    <Col span={24}>
                      <main>
                        <Routes>
                          <Route
                            path="actors"
                            element={loggedUser ? <Actors /> : <Login />}
                          />

                          <Route
                            path="movies"
                            element={loggedUser ? <Feed /> : <Login />}
                          />
                          <Route
                            path="dashboard"
                            element={loggedUser ? <Dashboard /> : <Login />}
                          />
                          <Route
                            path="dashboard/addmovie"
                            element={loggedUser ? <AddMovie /> : <Login />}
                          />
                          <Route
                            path="dashboard/addactor"
                            element={loggedUser ? <AddActor /> : <Login />}
                          />
                          <Route
                            path="dashboard/your-movies"
                            element={loggedUser ? <YourMovies /> : <Login />}
                          />
                          <Route
                            path="dashboard/your-actors"
                            element={loggedUser ? <YourActors /> : <Login />}
                          />
                          <Route
                            path="dashboard/profile"
                            element={loggedUser ? <UpdateProfile /> : <Login />}
                          />
                          <Route
                            path="dashboard/movie/edit/:id"
                            element={loggedUser ? <UpdateMovie /> : <Login />}
                          />
                          <Route
                            path="dashboard/actor/edit/:id"
                            element={loggedUser ? <UpdateActor /> : <Login />}
                          />

                          <Route path="login" element={<Login />} />
                          <Route path="signup" element={<Signup />} />
                          <Route path="feed" element={<Feed />} />
                        </Routes>
                      </main>
                    </Col>
                  </Row>
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
