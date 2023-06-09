"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.comparePassword = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
function hashPassword(password, secretKey) {
    const hmac = crypto_1.default.createHmac('sha256', secretKey);
    hmac.update(password);
    const hashedPassword = hmac.digest('hex');
    return hashedPassword;
}
exports.hashPassword = hashPassword;
function comparePassword(password, hash) {
    return password === hash;
}
exports.comparePassword = comparePassword;
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        return decoded.user;
    }
    catch (error) {
        throw new Error('Invalid token');
    }
}
exports.verifyToken = verifyToken;
