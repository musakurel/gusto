import { useContext, useEffect, useState } from "react";
import { Actor } from "../../types/entities";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const YourActors = () => {
  const actorDate = (actor: Actor) => {
    let str = actor.createdAt.toString();
    return str.split("T")[0];
  };

  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const [like, setLike] = useState(0);

  const [actors, setActors] = useState<Actor[]>();
  const context = useContext(UserContext);
  const user = context;
  const newAct = user.actors.sort().reverse();

  useEffect(() => {
    setActors(newAct);
  }, []);

  const handleShare = (id: number) => {
    axios
      .put(`${process.env.REACT_APP_BE_HOST}actors/${id}`, {
        isPublished: true,
      })
      .then(function (response) {
        console.log(response);
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
    window.open("/dashboard/your-actors", "_self");
  };
  const handleDelete = (id: number) => {
    axios
      .delete(`${process.env.REACT_APP_BE_HOST}actors/${id}`)
      .then(function (response) {
        console.log(response);
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
    window.open("/dashboard/your-actors", "_self");
  };

  return (
    <div>
      <div className="title-section">
        <h1 className="title">Your Favourite Actors </h1>
        <h2 className="subtitle">
          Add your favourite actors and share with everyone!{" "}
        </h2>
      </div>
      {actors &&
        actors.map((actor) => (
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
              {Users.filter((u) => u.id === movie?.userId)[0].username}
            </span> */}
                  <span className="postDate">
                    Shared At: {actorDate(actor)}
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
                  src={actor?.image ? actor?.image : "/placeholder.png"}
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
                    {actor.likeCount} people like it
                  </span>
                </div>
                <div className="postBottomRight">
                  <img
                    onClick={() => handleDelete(actor.id)}
                    className="likeIcon"
                    src="/delete.png"
                    alt=""
                  />
                  <Link to={"/dashboard/actor/edit/" + actor.id}>
                    <img style={{}} className="edit" src="/edit.png" alt="" />
                  </Link>
                  {actor.isPublished ? (
                    <button type="button" disabled className="shared-button">
                      {" "}
                      Shared{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleShare(actor.id)}
                      className="share-button"
                    >
                      {" "}
                      Share{" "}
                    </button>
                  )}
                  <span className="postCommentText">
                    {actor.likeCount} comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default YourActors;
