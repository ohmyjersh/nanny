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
const utils_1 = require("../utils/utils");
class ApiKeyHandler {
    create(apiKeyRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let guid = utils_1.default.newGuid();
            var encodedToken = new Buffer(guid).toString('base64');
            var apiKey = Object.assign({}, apiKeyRequest, { apiKey: encodedToken, isActive: true });
            return yield ApiKey_1.ApiKey.create(apiKey);
        });
    }
    getAllByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ApiKey_1.ApiKey.find({ userId: id });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ApiKey_1.ApiKey.find();
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiKeyHandler;
//# sourceMappingURL=ApiKey.js.map