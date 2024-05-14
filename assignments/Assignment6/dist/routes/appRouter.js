"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
// const {handleGetUsers, handleCreateUser} = require('../controllers/appRouterControllers');
// const {ValidateJwt, ValidateFieldContent, ValidateFieldLength} = require('../middlewares/appMiddlewares');
const express_1 = __importDefault(require("express"));
const appMiddlewares_1 = require("../middlewares/appMiddlewares");
const appRouterControllers_1 = require("../controllers/appRouterControllers");
const router = express_1.default.Router();
router.route("/")
    .all(appMiddlewares_1.ValidateJwt)
    .get(appRouterControllers_1.handleGetUsers)
    .post(appMiddlewares_1.ValidateFieldLength, appMiddlewares_1.ValidateFieldContent, appRouterControllers_1.handleCreateUser);
// module.exports = router;
exports.default = router;
