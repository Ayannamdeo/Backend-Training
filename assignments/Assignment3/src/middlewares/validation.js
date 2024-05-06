const userSchema = require("../config/validationRule");
const Joi = require("joi");
const geoip = require("geoip-lite");
const expectedCountryCode = "IN";

function validateUser(req, res, next) {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
}

function validateQuery(req, res, next) {
  const { id } = req.params;
  console.log("id: ", id);
  const { error } = Joi.number().validate(id);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
}

const locationValidation = (req, res, next) => {
  const ip = req.ip || req.headers["x-forwarded-for"];
  if (!ip) {
    return res.status(400).send("Unable to determine your location");
  }

  const geo = geoip.lookup(ip);
  if (!geo || geo.country !== expectedCountryCode) {
    return res.status(403).send("Access restricted for your region");
  }

  next();
};

module.exports = { validateUser, validateQuery, locationValidation };
