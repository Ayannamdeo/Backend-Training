const fs = require('fs');
const JWT = require("jsonwebtoken");
const SECRET = "ayan1234";

function generateDummyToken(req, res, next) {
  console.log(req.headers);
  const expiry = { expiresIn: 10 };

  const token = JWT.sign({ id: req.headers["user-agent"] }, SECRET, expiry);
  console.log(token);
  res.cookie("token", token)
  return res.redirect("/")
}

function ValidateJwt(req, res, next){
  console.log("inside validateJwt middleware", req.cookies);
    const cookietoken = req.cookies?.token;
    console.log(cookietoken);
    // if(!cookietoken) return res.status(401).json({message: "Authorization cookie token is missing"});
    if(!cookietoken) next({
      statusCode: 401,
      message: "Authorization cookie token is missing",
    });

    try {
    const decoded = JWT.verify(cookietoken, SECRET);
    console.log("decoded", decoded);
    next();
    } catch (error) {
      // return res.status(401).json({message: "Invalid Token or session expired"});
      next({
        statusCode: 401,
        message: "Invalid Token or session expired",
      });
    }
};

function logRequest(req, res, next){
  const log = `${req.method}: ${req.url} request recieved at ${Date.now()}\n`;
  console.log(log);
  fs.appendFile('./assignments/Assignment4/src/utils/log.txt', log, (err, data)=>{
    if(err) console.log("error while logging to file: ", err);
    next();
  });
}

function errorHandle(err, req, res, next){
  console.log("inside error handler middlware");
  const errStatus = err.statusCode || 500;
  res.status(errStatus).json({
    message: err.message || "Internal Server Error",
  });
}

function ValidateFieldLength(req, res, next) {
  const newUser = req.body;
  if (Object.keys(newUser).length === 0) {
    // return res.status(400).json({ message: "user must be passed" });
      next({
        statusCode: 400,
        message: "user must be passed",
      });

  } else {
    next();
  }
}
function ValidateFieldContent(req, res, next){
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.gender
  ) {
    next({
      statusCode: 400,
      message: "User Fields are missing, provide all fields.",
    });
  } else {
    next();
  }
}

function requestLimiter(limit){
  const requests = new Map();
  return (req, res, next) => {
    const userId = req.ip;
    if(!requests.has(userId)) requests.set(userId, 0);
    const count = requests.get(userId) + 1;
    requests.set(userId, count);
    if(count > limit) return res.status(429).json({message: "Too many requests"});
    setTimeout(()=>{
      requests.delete(userId);
    }, 10000);
    console.log(requests);
    next();
  }
}

module.exports = {
  generateDummyToken,
  ValidateJwt,
  logRequest,
  errorHandle,
  ValidateFieldLength,
  ValidateFieldContent,
  requestLimiter,
};
