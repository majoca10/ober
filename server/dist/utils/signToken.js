"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (_a) {
    var email = _a.email, isDriver = _a.isDriver;
    return jsonwebtoken_1.default.sign({
        email: email,
        isDriver: isDriver,
    }, process.env.JWT_SECRET_KEY || '1q2w3e4r5t6y', {
        expiresIn: '1d',
    });
});
