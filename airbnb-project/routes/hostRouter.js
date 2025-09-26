// Core Module
const path = require("path");
// External Module
const express = require("express");
const hostRouter = express.Router();
// Local Module
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "addHome.html"));
});

hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "homeadded.html"));
});

module.exports = hostRouter;
