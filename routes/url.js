const express = require("express");
const {
  handleGenerateShortURL,
  handleGetVisitedHistory,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortURL);

router.get("/getHistory/:shortId", handleGetVisitedHistory);

module.exports = router;
