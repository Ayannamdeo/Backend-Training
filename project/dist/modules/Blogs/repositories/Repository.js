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
exports.BlogRepository = void 0;
const ModelSchema_1 = require("./ModelSchema");
class BlogRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.findById(id);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.findByIdAndUpdate(id, data, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.findByIdAndDelete(id);
        });
    }
    getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.find({ user: userId });
        });
    }
}
exports.BlogRepository = BlogRepository;
