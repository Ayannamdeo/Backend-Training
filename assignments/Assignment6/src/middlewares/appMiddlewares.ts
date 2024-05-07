
import fs from 'fs';
import JWT from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const SECRET = "ayan1234";

function generateDummyToken(req: Request, res: Response, next: NextFunction): void {
  console.log(req.headers);
  const expiry = { expiresIn: 10 };

  const token = JWT.sign({ id: req.headers["user-agent"] }, SECRET, expiry);
  console.log(token);
  res.cookie("token", token)
  return res.redirect("/")
}

function ValidateJwt(req: Request, res: Response, next: NextFunction): void{
  console.log("inside validateJwt middleware", req.cookies);
    const cookietoken = req.cookies?.token;
    console.log(cookietoken);
    if(!cookietoken) next({
      statusCode: 401,
      message: "Authorization cookie token is missing",
    });

    try {
    const decoded = JWT.verify(cookietoken, SECRET);
    console.log("decoded", decoded);
    next();
    } catch (error) {
      next({
        statusCode: 401,
        message: "Invalid Token or session expired",
      });
    }
};

function logRequest(req: Request, res: Response, next: NextFunction): void{
  const log = `${req.method}: ${req.url} request recieved at ${Date.now()}\n`;
  console.log(log);
  fs.appendFile('./assignments/Assignment6/src/utils/log.txt', log, (err)=>{
    if(err) console.log("error while logging to file: ", err);
    next();
  });
}

function errorHandle(err: {statusCode: number, message: String},req: Request, res: Response, next: NextFunction): void{
  console.log("inside error handler middlware");
  const errStatus = err.statusCode || 500;
  res.status(errStatus).json({
    message: err.message || "Internal Server Error",
  });
}

function ValidateFieldLength(req: Request, res: Response, next: NextFunction): void {
  const newUser = req.body;
  if (Object.keys(newUser).length === 0) {
      next({
        statusCode: 400,
        message: "user must be passed",
      });

  } else {
    next();
  }
}
function ValidateFieldContent(req: Request, res: Response, next: NextFunction): void{
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

function requestLimiter(limit: number){
  const requests = new Map<string, number>();
  return (req: Request, res: Response, next: NextFunction)=> {
    const userId = req.ip || "unknown";
    if(!requests.has(userId)) requests.set(userId, 0);
    const count = requests.get(userId)! + 1;
    requests.set(userId, count);
    if(count > limit) return res.status(429).json({message: "Too many requests"});
    setTimeout(()=>{
      requests.delete(userId);
    }, 10000);
    console.log(requests);
    next();
  }
}

export{
  generateDummyToken,
  ValidateJwt,
  logRequest,
  errorHandle,
  ValidateFieldLength,
  ValidateFieldContent,
  requestLimiter,
};

// module.exports = {
//   generateDummyToken,
//   ValidateJwt,
//   logRequest,
//   errorHandle,
//   ValidateFieldLength,
//   ValidateFieldContent,
//   requestLimiter,
// };

