"use strict";
import * as crypto from "crypto";
import { User } from "../models/user";
import { Router, Request, Response } from "express";

export class AuthenticationRouter {
    private router: Router = Router();
    constructor() {
    }
    getRouter(): Router {
        this.router.post("/authentication/login", (request: Request, response: Response, next: Function) => {
            User
                .findOne({ username: request.body.username.toLowerCase() })
                .exec((err, result) => {
                    if (err) return next(err);
                    if (!result) return next({ status: 400, message: 'invalid username/password combination' });
                    result.comparePassword(request.body.password, (err, isMatch) => {
                        if (err) { 
                            return next(err)};
                        if (!isMatch) return next({ status: 400, message: 'invalid username/password combination' });
                        response.json({ token: result.createJWT(), username: result.username, id: result._id, role: result.role });
                    });
                });
        });

        this.router.post("/authentication/register", (request: Request, response: Response, next: Function) => {
            let user = new User(request.body);
            user.role = 'Basic';
            user.save((err, result) => {
                if (err) return next(err);
                response.json({ token: result.createJWT() });
            });
        });

        this.router.post("/authentication/changepassword", (request: Request, response: Response, next: Function) => {
            console.log(request.body);
            let { oldPassword, confirmPassword, userId } = request.body;
            User.findOne({_id:userId}, (err, result) => {
                // If query returned no results, token expired or was invalid. Return error.
                if (!result) {
                    response.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
                }
                result.comparePassword(oldPassword, (err, isMatch) => {
                        if (err) return next(err);
                        if (!isMatch) return next({ status: 400, message: "You've entered the wrong current password" });
                        // Otherwise, save new password and clear resetToken from database
                        result.password = confirmPassword;
                        result.save((err) => {
                            if (err) { return next(err); }
                            return response.status(200).json({ message: 'Password changed successfully!' });
                        });
                    });
            });
        });

        // probably move this to its own route and handler
        this.router.post('/authentication/invite', (request: Request, response: Response) => {
            response.send("invite user endpoint");
        });

        this.router.post('/authentication/forgotpassword', (request: Request, response: Response) => {
            response.send("forgot password");
        });

        return this.router;
    }
}