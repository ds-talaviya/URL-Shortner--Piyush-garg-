const User = require("../models/user");
const { v4: uuidV4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  console.log(">>>>>", req.body);
  const userData = req.body;
  await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
  return res.redirect("/login");
}

async function handleuserSignin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log(">>>>", user);
  if (!user)
    return res.render("singin", {
      error: "Invalid User and password",
    });

  const sessionId = uuidV4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}
module.exports = {
  handleUserSignup,
  handleuserSignin,
};
