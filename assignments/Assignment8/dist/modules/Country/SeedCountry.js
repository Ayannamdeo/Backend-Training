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
exports.SeedCountry = void 0;
const COUNTRY_DATA_json_1 = __importDefault(require("../../lib/utils/COUNTRY_DATA.json"));
const model_1 = require("./repositories/model");
class SeedCountry {
    static initialSeed() {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.CountryModel.deleteMany({});
            yield model_1.CountryModel.insertMany(COUNTRY_DATA_json_1.default);
        });
    }
}
exports.SeedCountry = SeedCountry;
