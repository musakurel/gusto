import { Router } from "express";
import { requireAuth, checkUser } from "../middleware/authMiddleware";

import {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
} from "../controllers/authController";
const router = require("express").Router();
const passport = require("passport");

// PASSPORT AUTH SUCCESS
router.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

// PASSPORT AUTH FAILED

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

//LOGOUT
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/logout");
});
//GOOGLE AUTH
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FE_HOST,
    failureRedirect: "auth/login/failed",
  })
);

// FACEBOOK AUTH
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.FE_HOST,
    failureRedirect: "auth/login/failed",
  })
);

router.get("/signup", signup_get);
router.get("/login", login_get);
router.get("/logout", logout_get);
router.post("/signup", signup_post);
router.post("/login", login_post);

export default router;
