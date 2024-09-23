const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const { connectToMongoDB } = require("./connect-db");
const { authLoggedInuser,userDetails } = require("./middlewares/auth");
const URL = require("./models/url");

const URLRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const UserRoute = require("./routes/user");

const app = express();
const port = 8000;

// set view engine as ejs
app.set("view engine", "ejs");
// give view path, so that only need to give file name
app.set("views", path.resolve("./views"));

// use for convert req body into json
app.use(express.json());

// use for convert form data to jsom
app.use(express.urlencoded({ extended: false }));

// use for parse cookies data
app.use(cookieParser());

// every route which starts with url go to URLRoute
app.use("/url", authLoggedInuser, URLRoute); // authLoggedInuser : we want to accessible this route the logged in user only
app.use("/user", UserRoute);
app.use("/", userDetails, staticRoute); // userDetails: set loggedin user from cookies, if user is there then show their's generated short urls

// // for testing how to send home.ejs as a response
// app.get("/test", async (req, res) => {
//   const allURLs = await URL.find({});
//   console.log(allURLs);
//   // you can pass parameters to home ejs file
//   res.render("home", {
//     urls: allURLs,
//   });
// });

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
});

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("Mongo DB connected");
});

app.listen(port, () => {
  console.log(`Server Started ${port}`);
});
