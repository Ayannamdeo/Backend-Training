"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const countrySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    continent: { type: String, required: true },
    capital: { type: String, required: true },
    population: { type: Number, required: true },
    language: { type: String, required: true },
}, { timestamps: true });
const CountryModel = mongoose_1.default.model("Country", countrySchema);
exports.CountryModel = CountryModel;
