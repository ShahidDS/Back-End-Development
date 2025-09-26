// Core Module
const path = require("path");
//External Module
const express = require("express");
//Local Module
const userRouter = require("./routes/userRouter.js");
const hostRouter = require("./routes/hostRouter.js");
const rootDir = require("./utils/pathUtil.js");

const { z } = require("zod");

const app = express();

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
});
