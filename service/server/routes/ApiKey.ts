import { Router, Request, Response } from 'express';
import ApiKeyHandler from '../handlers/ApiKey';
import { userAuth } from '../validators/tokenValidator';

export class ApiKeyRouter {
    private _apiKeyHandler;
    private router: Router = Router();
    constructor() {
        this._apiKeyHandler = new ApiKeyHandler();
    }
    getRouter(): Router {
        this.router.post('apikey', userAuth, async(request:Request, response:Response) => {
            await this._apiKeyHandler.create(request.body);
        });
        this.router.get('apikey/:id', userAuth, async(request:Request, response:Response) => {

        });
        this.router.get('apikey', userAuth, async(request:Request, response:Response) => {

        });
        this.router.put('apikey/:id', userAuth, async(request:Request, response:Response) => {

        });
        this.router.delete('apikey/:id', userAuth, async(request:Request, response:Response) => {

        });

        // user api key routes
        this.router.get('apikey/user/:userId', userAuth, async(request:Request, response:Response) => {
            await this._apiKeyHandler.getAllByUserId(request.params.userId);
        });

        return this.router;
    }
}

