"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const Services_1 = require("./Services");
const config_1 = require("../../config");
class UserControllers {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = req.body;
                const existingUser = yield this.UserServices.getUserByEmail(newUser.email);
                if (existingUser) {
                    res.status(401).json({ message: "This user already exists, kindly Login" });
                    return;
                }
                const result = yield this.UserServices.registerUser(newUser);
                res.status(201).json(result);
                console.log("result: ", result);
                //what will happen here?
                // res.redirect('/login'); 
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const existingUser = yield this.UserServices.getUserByEmail(user.email);
                if (!existingUser) {
                    res.status(404).json({ message: "No user found for current Email" });
                    return;
                }
                // correct password check now
                const comparePassword = yield Services_1.UserServices.verifyPassword(user, existingUser);
                if (!comparePassword) {
                    res.status(401).json({ message: "Invalid Credentials" });
                }
                const token = Services_1.UserServices.generateToken(existingUser, config_1.serverConfig.jwtSecret);
                console.log(token);
                res.cookie("JWT_Token", token);
                // res.status(200).send("CHECKPOINT");
                res.redirect('/CRUD');
            }
            catch (error) {
                res.status(500).json({ error: error.message, message: "Error while logging in..." });
            }
        });
        this.UserServices = new Services_1.UserServices();
    }
}
exports.UserControllers = UserControllers;
