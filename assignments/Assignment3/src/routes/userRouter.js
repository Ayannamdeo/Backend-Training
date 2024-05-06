const express = require("express");
const {
  validateUser,
  validateQuery,
  locationValidation,
} = require("../middlewares/validation");

const router = express.Router();

router.post("/validate", validateUser, (req, res) => {
  res.send("validated");
});

router.post("/post/:id", validateQuery, (req, res) => {
  res.json({ message: `user with ${req.params.id} validated` });
});

router.get("/", locationValidation, (req, res) => {
  res.json({ message: "user has access" });
});

module.exports = router;
