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
exports.ProductController = exports.upload = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const product_service_1 = __importDefault(require("../services/product.service"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_1 = __importDefault(require("multer"));
const typeorm_1 = require("typeorm");
exports.upload = (0, multer_1.default)({ dest: 'uploads/' });
cloudinary_1.default.v2.config({
    cloud_name: 'daib9xm2h',
    api_key: '443494128387516',
    api_secret: 'E7_1hdKaQPicFOinTpxpPQvovhU',
});
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAllProducts(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const search = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.search) || '';
            console.log('body', req);
            const { page = 0, perPage = 1 } = req.body;
            const options = {
                order: {
                    createdAt: 'DESC',
                },
                where: {
                    name: (0, typeorm_1.ILike)(`%${search}%`),
                },
                skip: page,
                take: perPage,
            };
            const products = yield this.productService.getProducts(options);
            const totalProducts = yield this.productService.countTotal();
            console.log(products);
            return res.json({
                success: true,
                message: 'ok',
                result: products,
                pagination: {
                    page,
                    perPage,
                    totalPage: Math.ceil(totalProducts / perPage),
                },
            });
        });
    }
    getProductsByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { offset = 1, limit = 5, categoryId } = req.body;
            const options = { where: { categoryId }, offset, limit };
            const productsByCategory = yield this.productService.getProducts(options);
            return res.json({
                success: true,
                message: 'ok',
                result: productsByCategory,
                pagination: {
                    offset,
                    limit,
                },
            });
        });
    }
    upload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { file } = req;
            const { id } = req.params;
            const product = yield this.productService.getProduct(id);
            if (!file) {
                return;
            }
            const result = yield cloudinary_1.default.v2.uploader.upload(file.path);
            const newProductWithImage = yield this.productService.updateProduct(Object.assign(Object.assign({}, product), { imgSrc: result.url }));
            return res.json(newProductWithImage);
        });
    }
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.createProduct(req.body);
            return res.json(product);
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/detail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsByCategory", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/:id/upload', exports.upload.single('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "upload", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
ProductController = __decorate([
    (0, inversify_express_utils_1.controller)('/products'),
    __metadata("design:paramtypes", [product_service_1.default])
], ProductController);
exports.ProductController = ProductController;
