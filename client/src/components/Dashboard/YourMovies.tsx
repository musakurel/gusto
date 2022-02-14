import React, { useContext, useEffect, useState } from "react";
import { Movie } from "../../types/entities";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./dashboard.css";

const YourMovies = () => {
  const movieDate = (movie: any) => {
    let str = movie.createdAt;
    return str.split("T")[0];
  };
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const context = useContext(UserContext);
  const user = context;

  const newMov = user.movies.sort().reverse();
  useEffect(() => {
    setMovies(newMov);
  }, []);



  const handleShare = (id: any) => {
    axios
      .put(`${process.env.REACT_APP_BE_HOST}movies/${id}`, {
        isPublished: true,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/movies");
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${process.env.REACT_APP_BE_HOST}movies/${id}`)
      .then(function (response) {
        console.log(response);
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
    window.open("/dashboard/your-movies", "_self");
  };
console.log(movies)
  return (
    <div>
      <div className="title-section">
        <h1 className="title">Your Favourite Movies </h1>
        <h2 className="subtitle">
          Add your favourite movies and share with everyone!{" "}
        </h2>
      </div>
      {movies &&
        movies.map((movie) => (
          <div key={movie.id} className="post">
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  <img
                    className="postProfileImg"
                    src={movie && "/placeholder.png"}
                    alt=""
                  />
                  {/* <span className="postUsername">
              {Users.filter((u) => u.id === movie?.userId)[0].username}
            </span> */}
                  <span className="postDate">
                    Shared At: {movieDate(movie)}
                  </span>
                  <span className="">
                    {" "}
                    {user.firstName + " " + user.lastName}{" "}
                  </span>
                </div>
                <div className="postTopRight"></div>
              </div>
              <div className="postCenter">
                <img
                  className="postImg"
                  src={movie.image ? movie.image : "/placeholder.png"}
                  alt=""
                />
                <div className="postContent">
                  <h2 className="postTitle">{movie?.movieName}</h2>
                  <span className="postText">{movie?.content}</span>
                </div>
              </div>
              <div className="postBottom">
                <div className="postBottomLeft">
                  <img
                    className="likeIcon"
                    src="/like.png"
                    alt=""
                  />
                  <img
                    className="likeIcon"
                    src="/love.png"
                    alt=""
                  />
                  <span className="postLikeCounter">
                    {movie.likeCount} people like it
                  </span>
                </div>
                <div className="postBottomRight">
                  <img
                    onClick={() => handleDelete(movie.id)}
                    className="likeIcon"
                    src="/delete.png"
                    alt=""
                  />
                  <Link to={"/dashboard/movie/edit/" + movie.id}>
                    <img style={{}} className="edit" src="/edit.png" alt="" />
                  </Link>
                  {movie.isPublished ? (
                    <button type="button" disabled className="shared-button">
                      {" "}
                      Shared{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleShare(movie.id)}
                      className="share-button"
                    >
                      {" "}
                      Share{" "}
                    </button>
                  )}
                  <span className="postCommentText">
                    {movie.likeCount} comments
                  </span>
                </div>
                
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default YourMovies;
