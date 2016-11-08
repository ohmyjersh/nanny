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
const generator_1 = require("../handlers/generator");
const utils_1 = require("../utils/utils");
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SecretKey',
    userProperty: 'payload'
});
class GeneratorRouter {
    constructor() {
        this.router = express_1.Router();
        this._generatorHandler = new generator_1.default();
    }
    getRouter() {
        this.router.post("/configuration/generator", (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (utils_1.default.isNullOrUndefined(request.body.manifest) && utils_1.default.isNullOrUndefined(request.body.configurations))
                response.status(400).json({ error: "Need manifest or configuration defined" });
            var configurations = yield this._generatorHandler.generateConfiguration(request.body.manifest, request.body.configurations, request.body.transformers, request.body.options);
            response.status(200).json(configurations);
        }));
        return this.router;
    }
}
exports.GeneratorRouter = GeneratorRouter;
//# sourceMappingURL=generator.js.map