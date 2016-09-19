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
const generate_1 = require("../handlers/generate");
class GenerateRouter {
    constructor() {
        this.router = express_1.Router();
        this._generateHandler = new generate_1.default();
    }
    getRouter() {
        this.router.post("configurtion/generate", (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._generateHandler.configuration();
            response.status(200);
        }));
        return this.router;
    }
}
exports.GenerateRouter = GenerateRouter;
//# sourceMappingURL=generate.js.map