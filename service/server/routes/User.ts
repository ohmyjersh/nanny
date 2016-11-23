import { Router, Request, Response } from "express";
import UserHandler from "../handlers/Users";

var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SecretKey',
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
        return req.query.token;
        }
        return null;
    }
});

export class UserRouter {
    private _userHandler;
    private router: Router = Router();
    constructor(){
        this._userHandler = new UserHandler();
    }
    getRouter(): Router {
        this.router.get("/user",auth, async(request: Request, response: Response) => {
           var result = await this._userHandler.getAll();
            response.send(result);
        });

        this.router.put('/user/:id', auth, async(request: Request, response: Response) => {
            await this._userHandler.update(request.params.id, request.body);
            response.status(200).send();
        });

        this.router.delete('/user/:id', auth, async(request: Request, response: Response) => {
            await this._userHandler.delete(request.params.id);
            response.status(200).send();
        });

        return this.router;
    }
}