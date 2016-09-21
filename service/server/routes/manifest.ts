import { Router, Request, Response } from "express";
import ManifestHandler from "../handlers/Manifest";
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SecretKey',
    userProperty: 'payload'
});

export class ManifestRouter {
    private _manifestHandler;
    private router: Router = Router();
    constructor(){
        this._manifestHandler = new ManifestHandler();
    }
    getRouter(): Router {
        this.router.post("/Manifest",auth, async(request: Request, response: Response) => {

            await this._manifestHandler.create(request.body);
            response.status(200);
        });

        this.router.get("/Manifest",auth, async(request: Request, response: Response) => {
            response.json("hi");
        });

        return this.router;
    }
}