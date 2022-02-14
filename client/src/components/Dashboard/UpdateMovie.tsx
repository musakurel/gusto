import "./dashboard.css";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../../types/entities";

const UpdateMovie = () => {
    const { id } = useParams();
  const context = useContext(UserContext);
  const user = context;

  console.log("updatemoviesayfası:", id);
  const [movie, setMovie] = useState<Movie>();

  const [movieName, setMovieName] = useState<string>();
  const movieNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieName(e.target.value);
  };
  const [content, setContent] = useState<string>();
  const contentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const [image, setImage] = useState<string>();
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };
console.log(image)
  const navigate = useNavigate();

  const config = { headers: { "Content-Type": "application/json" } };

  const handleSubmit = (itm: any) => {
    axios
      .put(
        `${process.env.REACT_APP_BE_HOST}movies/${itm}`,
        {
          content: content,
          movieName: movieName,
          image: image
        },
        config
      )
      .then(function (response) {
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
      window.open("/dashboard/your-movies", "_self");

    navigate("/dashboard/your-movies");
  };

  const deleteMovie = (itm: string | undefined) => {
    axios
      .delete(`${process.env.REACT_APP_BE_HOST}movies/${itm}`)
      .then(function (response) {
        console.log(response);
        window.open("/", "_self");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/movies");
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_HOST}movies/${id}`)
    .then((r) => r.json())
    .then((bfs) => setMovie(bfs));
  }, []);

  return (
    <div className="form">
      <h1 className="header">Update Your Favourite Movie</h1>
      <form onSubmit={() => handleSubmit(id)}>
        <input
          type="text"
          onChange={movieNameChange}
          name="movieName"
          placeholder="Movie name"
          defaultValue={movie?.movieName}
        />
        <input
          type="text"
          onChange={contentChange}
          name="lastName"
          placeholder="Last Name"
          defaultValue={movie?.content}
        />
        <input
          type="text"
          onChange={imageChange}
          name="imageUrl"
          placeholder="Image Url"
          defaultValue={movie?.image}
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

export default UpdateMovie;
