import React, { useContext } from "react";
import "./dashboard.css";
import { UserContext } from "../../UserContext";

const AddActor = () => {
  const context = useContext(UserContext);
  const user = context;

  return (
    <div>
      <div className="form">
        <h1 className="header">Add Actor</h1>
        <form method="POST" action={process.env.REACT_APP_BE_HOST + "actors"}>
          <input type="text" name="actorName" placeholder="Actor Name" />
          <input type="text" name="content" placeholder="Your Review" />
          <input type="text" name="image" placeholder="Image Url" />
          <input type="hidden" name="id" value={user.id} />
          <div className="check">
            <input
              className="checkbox"
              type="checkbox"
              id="isPublished"
              name="isPublished"
              value="true"
            />
            <label htmlFor="isPublished">
              {" "}
              Do you want to share with everyone ?
            </label>
          </div>
          <input value="Submit" className="submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddActor;
