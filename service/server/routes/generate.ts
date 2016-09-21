import { Router, Request, Response } from "express";
import GenerateHandler from "../handlers/generate";
import * as passport from 'passport';
const requireAuth = passport.authenticate('jwt', { session: false });

export class GenerateRouter {
    private _generateHandler;
    private router: Router = Router();
    constructor(){
        this._generateHandler = new GenerateHandler();
    }
    getRouter(): Router {
        this.router.post("configurtion/generate", async(request: Request, response: Response) => {
            console.log('in here');
            //await this._generateHandler.configuration();
            response.status(200);
        });
        return this.router;
    }
}