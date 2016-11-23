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
const Users_1 = require("../handlers/Users");
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
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this._userHandler = new Users_1.default();
    }
    getRouter() {
        this.router.get("/user", auth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            var result = yield this._userHandler.getAll();
            response.send(result);
        }));
        this.router.put('/user/:id', auth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._userHandler.update(request.params.id, request.body);
            response.status(200).send();
        }));
        this.router.delete('/user/:id', auth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this._userHandler.delete(request.params.id);
            response.status(200).send();
        }));
        return this.router;
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=User.js.map