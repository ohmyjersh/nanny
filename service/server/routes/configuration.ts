import { Router, Request, Response } from "express";
import ConfigurationHandler from "../handlers/configuration";
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SecretKey',
    userProperty: 'payload'
});

export class ConfigurationRouter {
    private _configurationHandler;
    private router: Router = Router();
    constructor(){
        this._configurationHandler = new ConfigurationHandler();
    }
    getRouter(): Router {

        this.router.post("/configuration", auth, async(request: Request, response: Response) => {

            await this._configurationHandler.create(request.body);
            response.status(200);
        });

        this.router.get("/configuration", auth, async(request: Request, response: Response) => {
            response.json("hi");
        });

        return this.router;
    }
}