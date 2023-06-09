"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AuthController = void 0;
const assert_1 = require("assert");
const inversify_express_utils_1 = require("inversify-express-utils");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const users_service_1 = __importDefault(require("../services/users.service"));
const helper_1 = require("../utils/helper");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const existingUser = yield this.userService.findOneByEmail(email);
            if (existingUser) {
                return res.status(401).json({ status: assert_1.ok, result: null, message: 'ok' });
            }
            const hashedPassword = (0, helper_1.hashPassword)(password, process.env.JWT_SECRET || '');
            const newUser = {
                name,
                email,
                password: hashedPassword,
                isAdmin: false,
                orders: [],
            };
            const user = yield this.userService.createUser(newUser);
            const token = (0, jsonwebtoken_1.sign)(user, process.env.JWT_SECRET || '', {
                expiresIn: '1h',
            });
            return res
                .status(200)
                .json({ status: assert_1.ok, result: { token }, message: 'ok' });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log(req.body);
            const user = yield this.authService.authenticate(email, password);
            console.log(user);
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Email or password was incorrect', result: null });
            }
            const token = (0, jsonwebtoken_1.sign)({ user }, process.env.JWT_SECRET || '', {
                expiresIn: '1h',
            });
            return res.status(200).json({ status: 'ok', token, message: 'ok' });
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)('/signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, inversify_express_utils_1.controller)('/auth'),
    __metadata("design:paramtypes", [users_service_1.default,
        auth_service_1.default])
], AuthController);
exports.AuthController = AuthController;
