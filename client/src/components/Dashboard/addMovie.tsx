import "./dashboard.css"

import { useContext } from 'react';
import { UserContext } from "../../UserContext";

const AddMovie = () => {

  const context = useContext(UserContext);
  const user = context;

  return (<div>

<div className="form" >
<h1 className="header">Add Movie</h1>
    <form method="POST" action={process.env.REACT_APP_BE_HOST+"movies"}>
      <input type="text" name="movieName" placeholder="Movie Name" />
      <input type="text" name="content" placeholder="Your Review" />
      <input type="text" name="image" placeholder="Image Url" />
      <input type="hidden" name="id" value={user.id} />

      <div className="check"> 
      <input className="checkbox" type="checkbox" id="isPublished" name="isPublished" value="true"/>
  <label htmlFor="isPublished"> Do you want to share with everyone ?</label>
      
      </div>
      <input value="Submit" className="submit" type="submit" />
    </form>
    </div>

  </div>)
};

export default AddMovie;
