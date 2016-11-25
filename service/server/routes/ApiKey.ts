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
        this.router.post('/apikey', userAuth, async(request:Request, response:Response) => {
            var result = await this._apiKeyHandler.create(request.body);
            console.log(result);
            response.status(200).send(result);
        });
        this.router.get('/apikey', userAuth, async(request:Request, response:Response) => {
            var result = await this._apiKeyHandler.getAll();
            response.status(200).send(result);
        });
        // this.router.put('/apikey/:id', userAuth, async(request:Request, response:Response) => {
        //     var result = await this._apiKeyHandler.update(request.params.id);
        //     response.sendStatus(200).send(result);
        // });
        this.router.delete('/apikey/:id', userAuth, async(request:Request, response:Response) => {
            var result = await this._apiKeyHandler.delete(request.params.id);
            response.status(200).send(result);
        });

        // user api key routes
        this.router.get('/apikey/user/:userId', userAuth, async(request:Request, response:Response) => {
            var result = await this._apiKeyHandler.getAllByUserId(request.params.userId);
            console.log(result);
            response.status(200).send(result);
        });

        return this.router;
    }
}

