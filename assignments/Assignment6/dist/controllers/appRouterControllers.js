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
exports.handleCreateUser = exports.handleGetUsers = void 0;
const MOCK_DATA_json_1 = __importDefault(require("../utils/MOCK_DATA.json"));
const fs_1 = __importDefault(require("fs"));
function handleGetUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const html = `
    <ul>
    ${MOCK_DATA_json_1.default.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
        return res.send(html);
    });
}
exports.handleGetUsers = handleGetUsers;
function handleCreateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        console.log(newUser);
        MOCK_DATA_json_1.default.push(Object.assign({ id: MOCK_DATA_json_1.default.length + 1 }, newUser));
        fs_1.default.writeFile("./assignments/Assignment4/src/utils/MOCK_DATA.json", JSON.stringify(MOCK_DATA_json_1.default), (err) => {
            if (err)
                console.log("error while reading to file: ", err);
            else
                console.log("successfully updated MOCK_DATA");
        });
        return res.json(MOCK_DATA_json_1.default[MOCK_DATA_json_1.default.length - 1]);
    });
}
exports.handleCreateUser = handleCreateUser;
