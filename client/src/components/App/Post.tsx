import "./post.css";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { Movie, Comment } from "../../types/entities";

export default function Movies({ movie }: { movie: Movie }) {
  const [like, setLike] = useState(movie.likeCount);
  const [isLiked, setIsLiked] = useState(false);

  const movieDate = movie.createdAt.toString().split("T")[0];

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const [content, setContent] = useState();
  const contentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleSubmit = (a: Number, b: Number) => {
    axios
      .post(`${process.env.REACT_APP_BE_HOST}comments/`, {
        content: content,
        movieId: b,
        userId: a,
      })
      .then(function (response) {
        console.log(response);
        window.open("/", "_self");
        window.open("/movies", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const context = useContext(UserContext);
  const user = context;
  console.log("updateprofilesayfası:", user.id);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <span className="postUsername">
              {Users.filter((u) => u.id === movie?.userId)[0].username}
            </span> */}
            <span className="postDate">Shared At: {movieDate + ""}</span>
            <span className="">
              {" "}
              Shared By: {movie.user.firstName + " " + movie.user.lastName}
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
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="/love.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {movie.comments.length} comments
            </span>
          </div>
        </div>

        <div className="postComment">
          <h4>Comments</h4>
          {movie &&
            movie.comments.map((c: Comment) => {
              return (
                <div className="comment-detail">
                  <p>
                    {" "}
                    <img className="likeIcon" src="/comment.png" alt="" />
                    {c.content}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="postComment">
          <form onSubmit={() => handleSubmit(user.id, movie.id)}>
            <input
              type="text"
              onChange={contentChange}
              name="content"
              placeholder="Your Comment"
            />
            <input className="submit" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
