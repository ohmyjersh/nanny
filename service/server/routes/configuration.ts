import { Router, Request, Response } from "express";
import ConfigurationHandler from "../handlers/configuration";
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

export class ConfigurationRouter {
    private _configurationHandler;
    private router: Router = Router();
    constructor(){
        this._configurationHandler = new ConfigurationHandler();
    }
    getRouter(): Router {

        this.router.post("/configuration", auth, async(request: Request, response: Response) => {
            await this._configurationHandler.create(request.body);
            response.status(200).send();
        });

        this.router.get("/configuration", auth, async(request: Request, response: Response) => {
            var result = await this._configurationHandler.getAll();
            response.send(result);
        });

        this.router.put("/configuration", auth, async(request: Request, response: Response) => {
            await this._configurationHandler.update(request.body.id, request.body);
            response.status(200).send();
        });

        this.router.delete("/configuration", auth, async(request: Request, response: Response) => {
            await this._configurationHandler.delete(request.body.id);
            response.status(200).send();
        });

        return this.router;
    }
}