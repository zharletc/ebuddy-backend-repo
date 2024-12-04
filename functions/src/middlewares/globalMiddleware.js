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
exports.globalMiddleware = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const globalMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // AUTHENTICATION: $2b$10$WigDg5zlt0rtL/hMLKPh8OTuqjEFZRkP27wc7NjsWdeomGHwc2tD6
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const authentication = req.headers.authentication;
    const authKey = 'EBUDDY.2024';
    if (!authentication) {
        res.status(403).send({ success: false, message: "Authentication is required", data: null });
        return;
    }
    // CHECK HASH AUTHKEY
    const isMatch = yield bcrypt_1.default.compare(authKey, authentication);
    if (!isMatch) {
        res.status(403).send({ success: false, message: "Authentication is invalid", data: null });
        return;
    }
    if (!token) {
        res.status(403).send({ success: false, message: "Token is required", data: null });
        return;
    }
    try {
        next();
    }
    catch (error) {
        res.status(401).send({ success: false, message: "Unauthorized", data: null });
        return;
    }
});
exports.globalMiddleware = globalMiddleware;
