const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server is live at 5000 and connected to database`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.get("/", (req, res) => {
  res.send("Great its is working");
});
app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = app;
