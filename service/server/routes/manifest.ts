import { Router, Request, Response } from "express";
import ManifestHandler from "../handlers/Manifest";
import {userAuth} from "../middleware/tokenValidator";

export class ManifestRouter {
    private _manifestHandler;
    private router: Router = Router();
    constructor(){
        this._manifestHandler = new ManifestHandler();
    }
    getRouter(): Router {
        this.router.post("/manifest",userAuth, async(request: Request, response: Response) => {
            console.log('create manifest');
            await this._manifestHandler.create(request.body);
            response.status(200);
        });

        this.router.get("/manifest",userAuth, async(request: Request, response: Response) => {
           console.log('get manifests');
           var result = await this._manifestHandler.getAll();
            response.send(result);
        });

        this.router.put('/manifest/:id', userAuth, async(request: Request, response: Response) => {
            console.log(`updating manifest with id: ${request.params.id}`)
            await this._manifestHandler.update(request.params.id, request.body);
            response.status(200).send();
        });

        this.router.delete('/manifest/:id', userAuth, async(request: Request, response: Response) => {
            console.log(`deleting manifest with id: ${request.params.id}`);
            await this._manifestHandler.delete(request.params.id);
            response.status(200).send();
        });

        return this.router;
    }
}