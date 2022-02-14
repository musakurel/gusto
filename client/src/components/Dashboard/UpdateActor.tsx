import "./dashboard.css";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Actor } from "../../types/entities";

const UpdateActor = () => {
    const { id } = useParams();
  const context= useContext(UserContext);
  const user= context;

  console.log("updatemoviesayfası:", id);
  const [actor, setActor] = useState<Actor>();

  const [actorName, setActorName] = useState<string>();
  const actorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActorName(e.target.value);
  };
  const [content, setContent] = useState<string>();
  const contentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const [image, setImage] = useState<string>();
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const navigate = useNavigate();

  const config = { headers: { "Content-Type": "application/json" } };

  const handleSubmit = (itm: string | undefined) => {
    axios
      .put(
        `${process.env.REACT_APP_BE_HOST}actors/${itm}`,
        {
          content: content,
          actorName: actorName,
          image: image
        },
        config
      )
      .then(function (response) {
        window.open("/", "_self");
        window.open("/dashboard/your-actors", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
      window.open("/dashboard/your-actors", "_self");

  };

  const deleteMovie = (itm: string | undefined) => {
    axios
      .delete(`${process.env.REACT_APP_BE_HOST}actors/${itm}`)
      .then(function (response) {
        console.log(response);
        window.open("/", "_self");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      window.open("/dashboard/your-actors", "_self");

    navigate("/dashboard/your-actors");
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_HOST}actors/${id}`)
    .then((r) => r.json())
    .then((bfs) => setActor(bfs));
  }, []);

  return (
    <div className="form">
      <h1 className="header">Update Your Favourite Movie</h1>
      <form onSubmit={() => handleSubmit(id)}>
        <input
          type="text"
          onChange={actorNameChange}
          name="movieName"
          placeholder="Movie name"
          defaultValue={actor?.actorName}
        />
        <input
          type="text"
          onChange={contentChange}
          name="lastName"
          placeholder="Last Name"
          defaultValue={actor?.content}
        />
        <input
          type="text"
          onChange={imageChange}
          name="imageUrl"
          placeholder="Image Url"
          defaultValue={actor?.image}
        />
        <input className="submit" type="submit" />
      </form>

      <button onClick={() => deleteMovie(id)} className="delete">
        {" "}
        Delete Movie{" "}
      </button>
    </div>
  );
};

export default UpdateActor;
