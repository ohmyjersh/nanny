import { Router, Request, Response } from 'express';
import ApiKeyHandler from '../handlers/ApiKey';
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SecretKey',
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});

export class ApiKeyRouter {
    private _apiKeyHandler;
    private router: Router = Router();
    constructor() {
        this._apiKeyHandler = new ApiKeyHandler();
    }
    getRouter(): Router {
        this.router.post('apikey', auth, async(request:Request, response:Response) => {

        });
        this.router.get('apikey', auth, async(request:Request, response:Response) => {

        });  
        return this.router;
    }
}

