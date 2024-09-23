const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req, res) => {
  // const allURLs = await URL.find({});
  const LoggedInUserURLs = await URL.find({ createdBy: req.user._id });
  res.render("home", {
    urls: LoggedInUserURLs,
  });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/login", async (req, res) => {
  res.render("singin");
});
module.exports = router;
