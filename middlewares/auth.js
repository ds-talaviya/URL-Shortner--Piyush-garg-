const { getUser } = require("../service/auth");

async function authLoggedInuser(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  console.log(">>>>>>>>>>>>>>", user);
  // after authenticate user set user in req body
  req.user = user;
  next();
}

async function userDetails(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = {
  authLoggedInuser,
  userDetails,
};
