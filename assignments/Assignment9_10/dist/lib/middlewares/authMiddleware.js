"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
class AuthMiddleware {
}
exports.AuthMiddleware = AuthMiddleware;
AuthMiddleware.authenticate = (req, res, next) => {
    var _a, _b;
    // console.log(req);
    console.log(req.cookies);
    console.log((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.JWT_Token);
    const cookietoken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.JWT_Token;
    console.log("cookie token is: ", cookietoken);
    if (!cookietoken) {
        res.status(401).json({ message: "Authorization cookie token is missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(cookietoken, config_1.serverConfig.jwtSecret);
        console.log("decode", decoded);
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid Token or Session expired" });
    }
};
