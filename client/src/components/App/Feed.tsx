import Post from "./Post";
import "./feed.css";
import { useEffect, useState } from "react";
import { Movie } from "../../types/entities";

export default function Feed() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_HOST}movies`)
      .then((r) => r.json())
      .then((bfs) => setMovies(bfs));
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {movies.map((p) => (
          <Post key={p.id} movie={p} />
        ))}
      </div>
    </div>
  );
}
