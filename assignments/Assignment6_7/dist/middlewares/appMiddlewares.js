"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "ayan1234";
class Middleware {
}
exports.Middleware = Middleware;
Middleware.generateDummyToken = (req, res, next) => {
    console.log(req.headers);
    const expiry = { expiresIn: 10 };
    const token = jsonwebtoken_1.default.sign({ id: req.headers["user-agent"] }, SECRET, expiry);
    console.log(token);
    res.cookie("token", token);
    return res.redirect("/");
};
Middleware.ValidateJwt = (req, res, next) => {
    var _a;
    console.log("inside validateJwt middleware", req.cookies);
    const cookietoken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    console.log(cookietoken);
    if (!cookietoken)
        next({
            statusCode: 401,
            message: "Authorization cookie token is missing",
        });
    try {
        const decoded = jsonwebtoken_1.default.verify(cookietoken, SECRET);
        console.log("decoded", decoded);
        next();
    }
    catch (error) {
        next({
            statusCode: 401,
            message: "Invalid Token or session expired",
        });
    }
};
Middleware.logRequest = (req, res, next) => {
    const log = `${req.method}: ${req.url} request recieved at ${Date.now()}\n`;
    console.log(log);
    fs_1.default.appendFile('./assignments/Assignment6_7/src/utils/log.txt', log, (err) => {
        if (err)
            console.log("error while logging to file: ", err);
        next();
    });
};
Middleware.errorHandle = (err, req, res, next) => {
    console.log("inside error handler middlware");
    const errStatus = err.statusCode || 500;
    res.status(errStatus).json({
        message: err.message || "Internal Server Error",
    });
};
Middleware.ValidateFieldLength = (req, res, next) => {
    const newUser = req.body;
    if (Object.keys(newUser).length === 0) {
        next({
            statusCode: 400,
            message: "user must be passed",
        });
    }
    else {
        next();
    }
};
Middleware.ValidateFieldContent = (req, res, next) => {
    if (!req.body.first_name ||
        !req.body.last_name ||
        !req.body.email ||
        !req.body.gender) {
        next({
            statusCode: 400,
            message: "User Fields are missing, provide all fields.",
        });
    }
    else {
        next();
    }
};
Middleware.requestLimiter = (limit) => {
    const requests = new Map();
    return (req, res, next) => {
        const userId = req.ip || "unknown";
        if (!requests.has(userId))
            requests.set(userId, 0);
        const count = requests.get(userId) + 1;
        requests.set(userId, count);
        if (count > limit)
            return res.status(429).json({ message: "Too many requests" });
        setTimeout(() => {
            requests.delete(userId);
        }, 10000);
        console.log(requests);
        next();
    };
};
