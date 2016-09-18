import express = require("express");
import ManifestHandler from "../handlers/manifestHandler";
import ConfigurationHandler from "../handlers/configurationHandler";
import IConfigurationModel from "../models/interfaces/IConfigurationModel"
var configurationHandler = new ConfigurationHandler();
var manifestHandler = new ManifestHandler();
let router = express.Router();

router.post('/', (request: express.Request, response: express.Response) => {
            try {
                request.body = {name:"hi",configurations:{["what"]:"thing"}};
                var configuration: IConfigurationModel = <IConfigurationModel>request.body;
                configurationHandler.create(configuration, (error, result) => {
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
            configurationHandler.findById(_id, (error, result) => {
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
        configurationHandler.retrieve((error, result) => {
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
            var configuration: IConfigurationModel = <IConfigurationModel>request.body;
            var _id: string = request.params._id;
            configurationHandler.update(_id, configuration, (error, result) => {
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
        configurationHandler.delete(_id, (error, result) => {
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
