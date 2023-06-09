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
const users_service_1 = __importDefault(require("../services/users.service"));
const inversify_express_utils_1 = require("inversify-express-utils");
const user_middleware_1 = require("../middlewares/user.middleware");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    // findOneUser(req: Request, res: Response, next: NextFunction) {
    //   console.log('hello');
    //   console.log(this);
    //   const data = this.userService.findAll();
    //   console.log(data);
    //   return res.json({ message: 'hello world' });
    // }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('this');
            const users = yield this.userService.findAll();
            // console.log(users);
            // const user = await this.userService.findOneByEmail('duong.bui@gmail.com');
            // console.log(user);
            // this.userService.sayHello();
            return res.json(users);
        });
    }
    login(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield this.userService.findOneById(parseInt(id));
            console.log(user);
            if (!user || ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id) !== parseInt(id)) {
                return res
                    .status(400)
                    .json({ status: 'fail', result: null, message: 'not ok' });
            }
            return res
                .status(200)
                .json({ status: 'success', result: user, message: 'ok' });
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/:id', user_middleware_1.userMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, inversify_express_utils_1.controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.default])
], UserController);
exports.default = UserController;
