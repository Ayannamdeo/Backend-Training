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
const logger_1 = require("../../lib/helpers/logger");
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
                logger_1.logger.info("result", result);
            }
            catch (error) {
                logger_1.logger.error("error occured while registering", error);
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
                logger_1.logger.debug("token", token);
                res.cookie("JWT_Token", token);
                // res.status(200).send("CHECKPOINT");
                res.redirect('/CRUD');
            }
            catch (error) {
                logger_1.logger.error("error occurrd while loggin in:", error);
                res.status(500).json({ error: error.message, message: "Error while logging in..." });
            }
        });
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield this.UserServices.getAllUsers();
                logger_1.logger.info("userLists: ", userList);
                if (!userList) {
                    logger_1.logger.warn("NO Users found");
                    res.status(404).json({ message: "NO Users found" });
                    return;
                }
                res.status(200).json(userList);
            }
            catch (error) {
                logger_1.logger.error("error while getting all users", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield this.UserServices.deleteUser(Number(req.params.id));
                logger_1.logger.info("deletedUser:", deletedUser);
                if (!deletedUser) {
                    res.status(404).json({ message: "None User with this id found" });
                    return;
                }
                res.status(200).json(deletedUser);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.UserServices = new Services_1.UserServices();
    }
}
exports.UserControllers = UserControllers;
