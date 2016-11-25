"use strict";
const user_1 = require("../models/user");
const express_1 = require("express");
class AuthenticationRouter {
    constructor() {
        this.router = express_1.Router();
    }
    getRouter() {
        this.router.post("/authentication/login", (request, response, next) => {
            user_1.User
                .findOne({ username: request.body.username.toLowerCase() })
                .exec((err, result) => {
                if (err)
                    return next(err);
                if (!result)
                    return next({ status: 400, message: 'invalid username/password combination' });
                result.comparePassword(request.body.password, (err, isMatch) => {
                    if (err)
                        return next(err);
                    if (!isMatch)
                        return next({ status: 400, message: 'invalid username/password combination' });
                    console.log(result);
                    response.json({ token: result.createJWT(), username: result.username, id: result._id, role: result.role });
                });
            });
        });
        this.router.post("/authentication/register", (request, response, next) => {
            let u = new user_1.User(request.body);
            u.hashPassword(request.body.password, (err, hash) => {
                u.password = hash;
                u.role = 'Basic';
                u.save((err, result) => {
                    if (err)
                        return next(err);
                    response.json({ token: result.createJWT() });
                });
            });
        });
        // probably move this to its own route and handler
        this.router.post('/authentication/invite', (request, response) => {
            response.send("invite user endpoint");
        });
        this.router.post('/authentication/forgotpassword', (request, response) => {
        });
        return this.router;
    }
}
exports.AuthenticationRouter = AuthenticationRouter;
//# sourceMappingURL=authentication.js.map