import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import "./auth.css"
const Login = () => {
  const google = () => {
    window.open(`${process.env.REACT_APP_BE_HOST}auth/google`, "_self");
  };

  

  const facebook = () => {
    window.open(`${process.env.REACT_APP_BE_HOST}auth/facebook`, "_self");
  };
  

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
        <form method="POST" action={process.env.REACT_APP_BE_HOST+"login"}>
      <input type="text" name="email" placeholder="Email" />
      <input type="text" name="password" placeholder="Password" />
      <input className="submit" type="submit" />
    </form>
        </div>
      </div>
    </div>
  );
};

export default Login;