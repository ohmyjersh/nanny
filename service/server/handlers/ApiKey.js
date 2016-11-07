"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const ApiKey_1 = require("../models/ApiKey");
class ApiKeyHandler {
    create(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ApiKey_1.ApiKey.create(apiKey);
        });
    }
    getAll(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ApiKey_1.ApiKey.find({ account: account });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiKeyHandler;
//# sourceMappingURL=ApiKey.js.map