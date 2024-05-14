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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const DB_Connection_1 = require("./lib/db/DB_Connection");
const routes_1 = __importDefault(require("./routes/routes"));
class Server {
    constructor(config) {
        this.connectDB = () => __awaiter(this, void 0, void 0, function* () {
            console.log("trying to connect db");
            yield this.db.connect().catch((err) => console.log(err));
        });
        this.disconnectDB = () => __awaiter(this, void 0, void 0, function* () {
            yield this.db.disconnect().catch((err) => console.log(err));
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.connectDB();
            console.log("after connectDB");
            this.app.listen(this.config.port, () => {
                console.log(`Node server started at port: ${this.config.port}`);
            });
        });
        this.app = (0, express_1.default)();
        this.config = config;
        this.db = DB_Connection_1.DB_Connection.getInstance(this.config.mongoUrl);
    }
    static getInstance(config) {
        if (!Server.instance) {
            Server.instance = new Server(config);
            Server.instance.bootstrap();
        }
        return Server.instance;
    }
    bootstrap() {
        this.configureMiddlewares();
        this.configureRoutes();
    }
    configureMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
    }
    configureRoutes() {
        this.app.use(routes_1.default);
    }
}
exports.Server = Server;
