import { Router, Request, Response } from 'express';
import ConfigurationHandler from '../handlers/configuration';
import {userAuth} from '../middleware/tokenValidator'

export class ConfigurationRouter {
    private _configurationHandler;
    private router: Router = Router();
    constructor(){
        this._configurationHandler = new ConfigurationHandler();
    }
    getRouter(): Router {

        this.router.post('/configuration', userAuth, async(request: Request, response: Response) => {
            await this._configurationHandler.create(request.body);
            response.status(200).send();
        });

        this.router.get('/configuration', userAuth, async(request: Request, response: Response) => {
            var result = await this._configurationHandler.getAll();
            response.send(result);
        });

        this.router.put('/configuration/:id', userAuth, async(request: Request, response: Response) => {
            await this._configurationHandler.update(request.params.id, request.body);
            response.status(200).send();
        });

        this.router.delete('/configuration/:id', userAuth, async(request: Request, response: Response) => {
            await this._configurationHandler.delete(request.params.id);
            response.status(200).send();
        });

        return this.router;
    }
}