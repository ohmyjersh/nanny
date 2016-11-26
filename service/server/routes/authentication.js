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
            let user = new user_1.User(request.body);
            user.role = 'Basic';
            user.save((err, result) => {
                if (err)
                    return next(err);
                response.json({ token: result.createJWT() });
            });
        });
        this.router.post("/authentication/changepassword", (request, response, next) => {
            let { confirmed, userId } = request.body;
            user_1.User.findOne({ _id: userId }, (err, resetUser) => {
                // If query returned no results, token expired or was invalid. Return error.
                if (!resetUser) {
                    response.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
                }
                // Otherwise, save new password and clear resetToken from database
                resetUser.password = confirmed;
                resetUser.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    return response.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });
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