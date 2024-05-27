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
class UserControllers {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = req.body;
                const existingUser = yield this.userServices.getUserByEmail(newUser.email);
                if (existingUser) {
                    res
                        .status(401)
                        .json({ message: "This user already exists, kindly Login" });
                    return;
                }
                const result = yield this.userServices.registerUser(newUser);
                res.status(201).json(result);
            }
            catch (error) { }
        });
        this.login = () => __awaiter(this, void 0, void 0, function* () { });
        this.userServices = new Services_1.UserServices();
    }
}
exports.UserControllers = UserControllers;
