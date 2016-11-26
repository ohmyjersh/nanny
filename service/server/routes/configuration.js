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
const configuration_1 = require("../handlers/configuration");
const tokenValidator_1 = require("../middleware/tokenValidator");
class ConfigurationRouter {
    constructor() {
        this.router = express_1.Router();
        this._configurationHandler = new configuration_1.default();
    }
    getRouter() {
        this.router.post('/configuration', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._configurationHandler.create(request.body);
            response.status(200).send();
        }));
        this.router.get('/configuration', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            var result = yield this._configurationHandler.getAll();
            response.send(result);
        }));
        this.router.put('/configuration/:id', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._configurationHandler.update(request.params.id, request.body);
            response.status(200).send();
        }));
        this.router.delete('/configuration/:id', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._configurationHandler.delete(request.params.id);
            response.status(200).send();
        }));
        return this.router;
    }
}
exports.ConfigurationRouter = ConfigurationRouter;
//# sourceMappingURL=configuration.js.map