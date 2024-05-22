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
exports.DB_Connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DB_Connection {
    constructor(url) {
        this.mongoUrl = url;
    }
    static getInstance(mongoUrl) {
        if (!DB_Connection.instance) {
            DB_Connection.instance = new DB_Connection(mongoUrl + 'CRUD');
            // console.log(`db connection instance created: ${DB_Connection.instance}`);
            console.log("db_connection instance created");
            console.log(DB_Connection.instance);
        }
        return DB_Connection.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.mongoUrl);
            }
            catch (error) {
                throw new Error(`mongodb connection error: ${error}`);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
            }
            catch (error) {
                throw new Error(`mongodb disconnection error: ${error}`);
            }
        });
    }
}
exports.DB_Connection = DB_Connection;
