"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
// const cookieparser = require('cookie-parser');
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// const appRouter = require('./routes/appRouter');
const appRouter_1 = __importDefault(require("./routes/appRouter"));
// const {generateDummyToken, logRequest, errorHandle, requestLimiter} = require('./middlewares/appMiddlewares');
const appMiddlewares_1 = require("./middlewares/appMiddlewares");
const app = (0, express_1.default)();
const server = () => {
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use((0, appMiddlewares_1.requestLimiter)(3));
    app.use((req, res, next) => {
        req.headers['X-customRequestHeader'] = 'qqqqqqqq';
        res.setHeader('X-customResponseHeader', 'ssssss');
        next();
    });
    app.use((req, res, next) => {
        console.log(req.headers['X-customRequestHeader']);
        console.log(res.getHeader('X-customResponseHeader'));
        next();
    });
    app.use(appMiddlewares_1.logRequest);
    app.use('/getAuthorized', appMiddlewares_1.generateDummyToken);
    app.use('/', appRouter_1.default);
    app.use(appMiddlewares_1.errorHandle);
    return app;
};
exports.default = server;
