"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const User_1 = require("../models/User");
class UserHandler {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.create(user);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findById(id);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findOne({ name: name });
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findByIdAndUpdate(id, user);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findByIdAndRemove(id);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserHandler;
//# sourceMappingURL=Users.js.map