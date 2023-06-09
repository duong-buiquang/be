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
const app_1 = require("../app");
class Db {
    findOneBy(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.findOne({
                where: { email },
            });
        });
    }
    constructor(target) {
        this._db = app_1.AppDataSource.getRepository(target);
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.save(product);
        });
    }
    findAll(options = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.find(options);
        });
    }
    create(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.save(newData);
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.findOne({ where: { id } });
        });
    }
    countTotal(options = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.count(options);
        });
    }
}
exports.default = Db;
