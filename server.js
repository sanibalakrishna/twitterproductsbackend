const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Great tis is working");
});

app.listen(5000, () => {
  console.log("server is live at port 5000");
});

module.exports = app;
