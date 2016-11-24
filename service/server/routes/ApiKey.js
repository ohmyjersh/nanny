"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express_1 = require("express");
const ApiKey_1 = require("../handlers/ApiKey");
const tokenValidator_1 = require("../validators/tokenValidator");
class ApiKeyRouter {
    constructor() {
        this.router = express_1.Router();
        this._apiKeyHandler = new ApiKey_1.default();
    }
    getRouter() {
        this.router.post('apikey', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._apiKeyHandler.create(request.body);
        }));
        this.router.get('apikey/:id', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
        }));
        this.router.get('apikey', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
        }));
        this.router.put('apikey/:id', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
        }));
        this.router.delete('apikey/:id', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
        }));
        // user api key routes
        this.router.get('apikey/user/:userId', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._apiKeyHandler.getAllByUserId(request.params.userId);
        }));
        return this.router;
    }
}
exports.ApiKeyRouter = ApiKeyRouter;
//# sourceMappingURL=ApiKey.js.map