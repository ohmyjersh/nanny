import { Router, Request, Response } from "express";
import UserHandler from "../handlers/Users";
import {userAuth} from "../validators/tokenValidator";

export class UserRouter {
    private _userHandler;
    private router: Router = Router();
    constructor(){
        this._userHandler = new UserHandler();
    }
    getRouter(): Router {
        this.router.get("/user",userAuth, async(request: Request, response: Response) => {
           var result = await this._userHandler.getAll();
            response.send(result);
        });

        this.router.put('/user/:id', userAuth, async(request: Request, response: Response) => {
            await this._userHandler.update(request.params.id, request.body);
            response.status(200).send();
        });

        this.router.delete('/user/:id', userAuth, async(request: Request, response: Response) => {
            await this._userHandler.delete(request.params.id);
            response.status(200).send();
        });

        return this.router;
    }
}