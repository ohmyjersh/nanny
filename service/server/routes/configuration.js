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
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SecretKey',
    userProperty: 'payload'
});
class ConfigurationRouter {
    constructor() {
        this.router = express_1.Router();
        this._configurationHandler = new configuration_1.default();
    }
    getRouter() {
        this.router.post("/configuration", auth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._configurationHandler.create(request.body);
            response.status(200);
        }));
        this.router.get("/configuration", auth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.json("hi");
        }));
        return this.router;
    }
}
exports.ConfigurationRouter = ConfigurationRouter;
//# sourceMappingURL=configuration.js.map