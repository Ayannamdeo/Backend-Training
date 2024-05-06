const express = require("express");
const createError = require("http-errors");

const router = express.Router();

router.get("/", (req, res) => res.status(200).send("Hello"));

router.get("/501", (req, res, next) => {
  next(createError(501, "Not Implemented"));
});

router.get("/401", (req, res, next) => {
  next(createError(401, "Unauthorized"));
});

router.get("/async_error", async(req, res, next)=>{
  try {
    await new Promise((resolve, reject) => {
      setTimeout(()=> {
          reject(createError(503, 'An asynchronous error occurred!'));
      }, 2000);
    })
  } catch (error) {
    next(error);
  }
});

router.get("/validate", (req, res, next) => {
  const { param1 } = req.query;
  console.log(param1);
  if (!param1) {
    return next(createError(400, "Missing Parameters"));
  }
  res.json({ message: "Validation Successful", data: { param1 } });
});

router.get("*", (req, res, next) => {
  next(createError(404, "Not found"));
});

module.exports = router;
