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
                        if (err) return next(err);
                        if (!isMatch) return next({ status: 400, message: 'invalid username/password combination' });
                        console.log(result);
                        response.json({ token: result.createJWT(), username:result.username,id:result._id,role:result.role });
                    });
                });
        });

        this.router.post("/authentication/register", (request: Request, response: Response, next: Function) => {
            let u = new User(request.body);
            u.hashPassword(request.body.password, (err, hash) => {
                u.password = hash;
                u.role = 'Basic';
                u.save((err, result) => {
                    if (err) return next(err);
                    response.json({ token: result.createJWT() });
                });
            });
        });
        // probably move this to its own route and handler
        this.router.post('/authentication/invite', (request:Request,response:Response) => {
            response.send("invite user endpoint");
        });
        
        this.router.post('/authentication/forgotpassword', (request:Request,response:Response) => {

        });

        return this.router;
    }
}