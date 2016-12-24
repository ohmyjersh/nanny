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
const Manifest_1 = require("../handlers/Manifest");
const tokenValidator_1 = require("../middleware/tokenValidator");
class ManifestRouter {
    constructor() {
        this.router = express_1.Router();
        this._manifestHandler = new Manifest_1.default();
    }
    getRouter() {
        this.router.post("/manifest", tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log('create manifest');
            yield this._manifestHandler.create(request.body);
            response.status(200);
        }));
        this.router.get("/manifest", tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log('get manifests');
            var result = yield this._manifestHandler.getAll();
            response.send(result);
        }));
        this.router.put('/manifest/:id', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log(`updating manifest with id: ${request.params.id}`);
            yield this._manifestHandler.update(request.params.id, request.body);
            response.status(200).send();
        }));
        this.router.delete('/manifest/:id', tokenValidator_1.userAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log(`deleting manifest with id: ${request.params.id}`);
            yield this._manifestHandler.delete(request.params.id);
            response.status(200).send();
        }));
        return this.router;
    }
}
exports.ManifestRouter = ManifestRouter;
//# sourceMappingURL=manifest.js.map