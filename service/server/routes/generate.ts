import { Router, Request, Response } from "express";
import GenerateHandler from "../handlers/generate";
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SecretKey',
    userProperty: 'payload'
});

export class GenerateRouter {
    private _generateHandler;
    private router: Router = Router();
    constructor(){
        this._generateHandler = new GenerateHandler();
    }
    getRouter(): Router {
        this.router.post("configurtion/generate", auth, async(request: Request, response: Response) => {
            await this._generateHandler.configuration();
            response.status(200);
        });
        return this.router;
    }
}