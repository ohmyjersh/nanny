import { Router, Request, Response } from "express";
import ManifestHandler from "../handlers/Manifest";

export class ManifestRouter {
    private _manifestHandler;
    private router: Router = Router();
    constructor(){
        this._manifestHandler = new ManifestHandler();
    }
    getRouter(): Router {
        this.router.post("/Manifest", async(request: Request, response: Response) => {

            await this._manifestHandler.create(request.body);
            response.status(200);
        });

        this.router.get("/Manifest", async(request: Request, response: Response) => {
            response.json("hi");
        });

        return this.router;
    }
}