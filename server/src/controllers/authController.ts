import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { RequestHandler } from "express";
import { getManager } from "typeorm";
import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

//Handle Errors

// GOOGLE AUTH
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      console.log(profile._json.picture)

      try {
        const valid = await User.findOne({ where: { email: email } ,relations:["actors", "movies", "comments"]});
        console.log("valid:",valid)
        if (!valid) {
          const user = new User();
          user.email = profile.emails[0].value;
          user.firstName = profile.name.givenName;
          user.lastName = profile.name.familyName;
          user.imageUrl = profile._json.picture
          ;
          await user.save();
          done(null, user);
        }
        done(null, valid);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


// FACEBOOK AUTH
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;

      try {
        const valid = await User.findOne({ where: { email: email },relations:["actors", "movies", "comments"] });
        if (!valid) {
          const user = new User();
          user.email = profile.emails[0].value;
          user.firstName = profile.name.givenName;
          user.lastName = profile.name.familyName;
          await user.save();
          
          done(null, user);
        }
        done(null, valid);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

//CREATE TOKEN
const maxAge = 24 * 60 * 60;
const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: maxAge });
};

export const signup_get: RequestHandler = (req, res) => {
  res.redirect(process.env.FE_HOST);
};
export const login_get: RequestHandler = (req, res) => {
  res.redirect(process.env.FE_HOST);
};

//CREATE USER
export const signup_post: RequestHandler = async (req, res) => {
  console.log(req.body);
  const { email, password, firstName, lastName } = req.body;
  try {
    const userExist= await User.findOne({where:{email}})
    if(userExist){
      res.status(201).redirect(`${process.env.FE_HOST}login`);
    }
    else{

      const repository = getManager().getRepository(User);
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await repository.save({
        email,
        password: hashedPassword,
        firstName,
        lastName
      });
      const token = createToken(user.email);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.cookie("user", user.id, {  maxAge: maxAge * 1000 });
      res.status(201).redirect(`${process.env.FE_HOST}movies`);
    }
  
  } catch (err) {
    res.status(400).send(err);
  }
};

//LOGIN USER
export const login_post: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = createToken(user.email);
      res.cookie("jwt", token, {  maxAge: maxAge * 1000 });
      res.cookie("user", user.id, {  maxAge: maxAge * 1000 });

      res.status(200).redirect(`${process.env.FE_HOST}`);
    } else {
      res.status(401).redirect(`${process.env.FE_HOST}login`);
    }
  } catch (error) {
    res.status(400).send("error oluştu");
  }
};



// LOGOUT USER
export const logout_get: RequestHandler = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("user", "", { maxAge: 1 });
  res.cookie("session", "", { maxAge: 1 });
  res.cookie("session.sig", "", { maxAge: 1 });
  console.log("cıkış yapıldı");
  res.redirect(process.env.FE_HOST);
};

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  User.findOne(user.id,{relations:["movies","actors","comments"]}).then((user) => {
    done(null, user);
  });
});
