import express = require("express");
import UserHandler from "../handlers/UserHandler";
import IUserModel from "../models/interfaces/IUserModel"
var userHandler = new UserHandler();
let router = express.Router();

router.post('/', (request: express.Request, response: express.Response) => {
            try {
                var manifest: IUserModel = <IUserModel>request.body;
                userHandler.create(manifest, (error, result) => {
                    if(error) response.send({"error": "error"});
                    else response.send({"success": "success"});
                });
            }
            catch (e)  {
                console.log(e);
                response.send({"error": "error in your request"});
            }
})

router.get('/{id}', (request: express.Request, response: express.Response) => {
    try {
            
            var _id: string = request.params._id;
            userHandler.findById(_id, (error, result) => {
                if(error) response.send({"error": "error"});
                else response.send(result);
            });   
        }
        catch (e)  {
            console.log(e);
            response.send({"error": "error in your request"});
            
        }
})

router.get('/', (request: express.Request, response: express.Response) => {
    try {
        userHandler.retrieve((error, result) => {
            if(error) response.send({"error": "error"});
            else response.send(result);
        });   
        }
        catch (e)  {
            console.log(e);
            response.send({"error": "error in your request"});

        }
}) 

router.put('/{id}', (request: express.Request, response: express.Response) => {
    try {
            var manifest: IUserModel = <IUserModel>request.body;
            var _id: string = request.params._id;
            userHandler.update(_id, manifest, (error, result) => {
                if(error) response.send({"error": "error"});
                else response.send({"success": "success"});
            });   
        }
        catch (e)  {
            console.log(e);
            response.send({"error": "error in your request"});

        }
})

router.delete('/{id}', (request: express.Request, response: express.Response) => {
    try {
            
        var _id: string = request.params._id;
        userHandler.delete(_id, (error, result) => {
                if(error) response.send({"error": "error"});
                else response.send({"success": "success"});
            });   
        }
        catch (e)  {
            console.log(e);
            response.send({"error": "error in your request"});

        }
})

export = router;
