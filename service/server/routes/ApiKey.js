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
const tokenValidator_1 = require("../middleware/tokenValidator");
class ApiKeyRouter {
    constructor() {
        this.router = express_1.Router();
        this._apiKeyHandler = new ApiKey_1.default();
    }
    getRouter() {
        this.router.post('/apikey', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            var result = yield this._apiKeyHandler.create(request.body);
            console.log(result);
            response.status(200).send(result);
        }));
        this.router.get('/apikey', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            var result = yield this._apiKeyHandler.getAll();
            response.status(200).send(result);
        }));
        // this.router.put('/apikey/:id', userAuth, async(request:Request, response:Response) => {
        //     var result = await this._apiKeyHandler.update(request.params.id);
        //     response.sendStatus(200).send(result);
        // });
        this.router.delete('/apikey/:id', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            var result = yield this._apiKeyHandler.delete(request.params.id);
            response.status(200).send(result);
        }));
        // user api key routes
        this.router.get('/apikey/user/:userId', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            var result = yield this._apiKeyHandler.getAllByUserId(request.params.userId);
            response.status(200).send(result);
        }));
        return this.router;
    }
}
exports.ApiKeyRouter = ApiKeyRouter;
//# sourceMappingURL=ApiKey.js.map