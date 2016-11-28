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
                    if (err) {
                        return next(err);
                    }
                    ;
                    if (!isMatch)
                        return next({ status: 400, message: 'invalid username/password combination' });
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
            console.log(request.body);
            let { oldPassword, confirmPassword, userId } = request.body;
            user_1.User.findOne({ _id: userId }, (err, result) => {
                // If query returned no results, token expired or was invalid. Return error.
                if (!result) {
                    response.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
                }
                result.comparePassword(oldPassword, (err, isMatch) => {
                    if (err)
                        return next(err);
                    if (!isMatch)
                        return next({ status: 400, message: "You've entered the wrong current password" });
                    // Otherwise, save new password and clear resetToken from database
                    result.password = confirmPassword;
                    result.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        return response.status(200).json({ message: 'Password changed successfully!' });
                    });
                });
            });
        });
        // probably move this to its own route and handler
        this.router.post('/authentication/invite', (request, response) => {
            response.send("invite user endpoint");
        });
        this.router.post('/authentication/forgotpassword', (request, response) => {
            response.send("forgot password");
        });
        return this.router;
    }
}
exports.AuthenticationRouter = AuthenticationRouter;
//# sourceMappingURL=authentication.js.map