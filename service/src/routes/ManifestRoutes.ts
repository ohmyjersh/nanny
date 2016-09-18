import express = require("express");
import ManifestHandler from "../handlers/ManifestHandler";
import IManifestModel from "../models/interfaces/IManifestModel"
var manifestHandler = new ManifestHandler();
let router = express.Router();

router.post('/', (request: express.Request, response: express.Response) => {
            try {
                request.body = {name:"hi",configurations:{["what"]:"thing"}};
                var manifest: IManifestModel = <IManifestModel>request.body;
                manifestHandler.create(manifest, (error, result) => {
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
            manifestHandler.findById(_id, (error, result) => {
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
        manifestHandler.retrieve((error, result) => {
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
            var manifest: IManifestModel = <IManifestModel>request.body;
            var _id: string = request.params._id;
            manifestHandler.update(_id, manifest, (error, result) => {
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
        manifestHandler.delete(_id, (error, result) => {
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
