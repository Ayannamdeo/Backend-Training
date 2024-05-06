const express = require("express");
const userRouter = require("./router/userRouter");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
function server() {
  app.use(express.json());
  app.use("/api", userRouter);
  app.use(errorHandler);
  return app;
}

module.exports = server;
