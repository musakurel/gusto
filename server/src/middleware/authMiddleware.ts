import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { RequestHandler } from "express";

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if the token exists
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      console.log(decoded);
      next();
    } catch (error) {
      console.log("Benim error", error);
      res.redirect(`${process.env.FE_HOST}`);
    }
  } else {
    res.redirect(`${process.env.FE_HOST}`);
  }
};

export const checkUser: RequestHandler = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

      console.log(decodedToken);

      let user = await User.findOne({where:{id:decodedToken}});
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(error);
      //  res.locals.user = null;
      next();
    }
  } else {
    //res.locals.user = null;
    next();
  }
};
