import React, { useState, useEffect } from "react";
import { Movie } from "../../types/entities";

import "./list.css";
import { useNavigate } from "react-router";

const Movies = () => {
  let navigate = useNavigate();

  // Delete a butterfly redirect to butterflies page
  async function deleteMovie(item: number) {
    await fetch(`${process.env.REACT_APP_BE_HOST}movies/${item}`, {
      method: "DELETE",
    });
    navigate("/");
    navigate("/movies");
  }
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_HOST}movies`)
      .then((r) => r.json())
      .then((bfs) => setMovies(bfs));
  }, []);

  return (
    <div className="grid">
      <h1>Movies</h1>
      {movies.map((b) => (
        <div key={b.id} className="card">
          <p className="name">{b.movieName}</p>
          <p className="content">{b.content}</p>
          <div className="buttons">
            <a href="/">
              <button className="card_button">Open</button>
            </a>
            <button className="card_button" onClick={() => deleteMovie(b.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
