import { Router, Request, Response } from "express";
import GeneratorHandler from "../handlers/generator";
import Util from "../utils/utils";
import {apiKeyAuth} from "../validators/tokenValidator";

export class GeneratorRouter {
    private _generatorHandler;
    private router: Router = Router();
    constructor(){
        this._generatorHandler = new GeneratorHandler();
    }
    getRouter(): Router {
        this.router.post("/configuration/generator", async(request: Request, response: Response) => {
            if(Util.isNullOrUndefined(request.body.manifest) && Util.isNullOrUndefined(request.body.configurations))
                response.status(400).json({error:"Need manifest or configuration defined"});
            var configurations = await this._generatorHandler.generateConfiguration(request.body.manifest, request.body.configurations, request.body.transformers, request.body.options);
            response.status(200).json(configurations);
        });
        return this.router;
    }
}