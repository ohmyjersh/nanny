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
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SecretKey',
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});
class ApiKeyRouter {
    constructor() {
        this.router = express_1.Router();
        this._apiKeyHandler = new ApiKey_1.default();
    }
    getRouter() {
        this.router.post('apikey', auth, (request, response) => __awaiter(this, void 0, void 0, function* () {
        }));
        this.router.get('apikey', auth, (request, response) => __awaiter(this, void 0, void 0, function* () {
        }));
        return this.router;
    }
}
exports.ApiKeyRouter = ApiKeyRouter;
//# sourceMappingURL=ApiKey.js.map