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
exports.BlogControllers = void 0;
const logger_1 = require("../../lib/helpers/logger");
const Services_1 = require("./Services");
class BlogControllers {
    constructor() {
        this.getAllContent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const contentList = yield this.blogService
                    .getAllContent()
                    .catch((err) => console.log("errrrrr", err));
                if (!contentList || contentList.length === 0) {
                    logger_1.logger.warn("no content in db");
                    res.status(404).json({ message: "no content in db" });
                }
                else {
                    res.json(contentList);
                }
            }
            catch (error) {
                logger_1.logger.error("error in getAll Api", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.getContentById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.blogService.getContentById(req.params.id);
                if (!content) {
                    logger_1.logger.warn("content not found");
                    res.status(404).json({ message: "content not found" });
                }
                else {
                    res.status(200).json(content);
                }
            }
            catch (error) {
                logger_1.logger.error("error in getContentById Api", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.createContent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const createdContent = yield this.blogService.createContent(req.body);
                res.status(201).json(createdContent);
            }
            catch (error) {
                logger_1.logger.error("error in createContent Api", error);
                res.status(400).json({ message: error.message });
            }
        });
        this.updateContent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContent = yield this.blogService.updateContent(req.params.id, req.body);
                if (!updatedContent) {
                    logger_1.logger.warn("ID not found");
                    res.status(404).json({ message: "ID not found" });
                }
                res.status(200).json(updatedContent);
            }
            catch (err) {
                logger_1.logger.error("error in updateContent Api", err);
                res.status(400).json({ message: err.message });
            }
        });
        this.deleteContent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedContent = yield this.blogService.deleteContent(req.params.id);
                res.status(200).json(deletedContent);
            }
            catch (err) {
                logger_1.logger.error("error in deleteContent Api", err);
                res.status(500).json({ message: err.message });
            }
        });
        this.getUserBlogs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userBlogs = yield this.blogService.getUserBlogs(req.params.userid);
                if (!userBlogs || userBlogs.length === 0) {
                    logger_1.logger.warn("No blogs found for this user");
                    res.status(404).json({ message: "No blogs found for this user" });
                }
                else {
                    res.status(200).json(userBlogs);
                }
            }
            catch (error) {
                logger_1.logger.error("error in getUserBlogs Api", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.blogService = new Services_1.BlogService();
    }
}
exports.BlogControllers = BlogControllers;
