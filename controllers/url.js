// const { nanoid } = require("nanoid");
const shortId = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  // const shortID = nanoid(8);
  const shortID = shortId();

  console.log("11",req.user)
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortID,
  });
}

async function handleGetVisitedHistory(req, res) {
  if (!req.params && req.params.shortId) {
    return res.status(400).json({ error: "shortId is required" });
  }
  const shortId = req.params.shortId;

  const result = await URL.findOne({
    shortId: shortId,
  });

  return res.json({
    totalClicks: result.visitHistory.length,
    data: result.visitHistory,
  });
}
module.exports = {
  handleGenerateShortURL,
  handleGetVisitedHistory,
};
