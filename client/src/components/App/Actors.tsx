import "./post.css";
import { useContext, useEffect, useState } from "react";
import { Actor } from "../../types/entities";
import axios from "axios";
import { UserContext } from "../../UserContext";

export default function Actors() {
  const [actors, setActors] = useState<Actor[]>([]);
  //const actorDate= actor.createdAt.split("T")[0]

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_HOST}actors`)
      .then((r) => r.json())
      .then((bfs) => setActors(bfs));
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const [like, setLike] = useState(0);

  const [content, setContent] = useState();
  const contentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleSubmit = (a: Number, b: Number) => {
    axios
      .post(`${process.env.REACT_APP_BE_HOST}comments/`, {
        content: content,
        actorId: b,
        userId: a,
      })
      .then(function (response) {
        console.log(response);
        window.open("/", "_self");
        window.open("/actors", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
    window.open("/dashboard/profile", "_self");
  };

  const context = useContext(UserContext);
  const user = context;
  console.log("updateprofilesayfası:", user.id);

  return (
    <div>
      {actors.map(
        (actor: Actor) =>
          actor.isPublished && (
            <div className="post">
              <div className="postWrapper">
                <div className="postTop">
                  <div className="postTopLeft">
                    <img
                      className="postProfileImg"
                      src={actor && "/placeholder.png"}
                      alt=""
                    />

                    {/* <span className="postUsername">
              {actor.userId}
            </span> */}
                    <span className="postDate">
                      Shared At: {actor?.updatedAt}{" "}
                    </span>
                    <span className="">
                      {" "}
                      Shared By:{" "}
                      {actor.user.firstName + " " + actor.user.lastName}
                    </span>
                  </div>
                  <div className="postTopRight"></div>
                </div>
                <div className="postCenter">
                  <img
                    className="postImg"
                    src={actor.image ? actor.image : "/placeholder.png"}
                    alt=""
                  />
                  <div className="postContent">
                    <h2 className="postTitle">{actor?.actorName}</h2>
                    <span className="postText">{actor?.content}</span>
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
                    <span className="postLikeCounter">
                      {like} people like it
                    </span>
                  </div>
                  <div className="postBottomRight">
                    <span className="postCommentText">
                      {actor.comments.length} comments
                    </span>
                  </div>
                </div>
                <div className="postComment">
                  <h4>Comments</h4>
                  {actor &&
                    actor.comments.map((c) => {
                      return (
                        <div className="comment-detail">
                          <p>
                            {" "}
                            <img
                              className="likeIcon"
                              src="/comment.png"
                              alt=""
                            />
                            {c.content}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div className="postComment">
                  <form onSubmit={() => handleSubmit(user.id, actor.id)}>
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
          )
      )}
    </div>
  );
}
