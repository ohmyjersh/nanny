import express = require("express");
import Util from "../utils/util";
import GenerateConfigurationHandler from "../handlers/GenerateConfigurationHandler";
let router = express.Router();

router.post('/', (request: express.Request, response: express.Response) => {
    if(Util.isNullOrUndefined(request.body.manifest) && Util.isNullOrUndefined(request.body.configurations)){
        return response.status(404).send({error:"Manifest or Configuration needed"});
    };
    try {
        // request.body = {name:"hi",configurations:{["what"]:"thing"}};
        // var manifest: IManifestModel = <IManifestModel>request.body;
        // manifestHandler.create(manifest, (error, result) => {
        //     if(error) response.send({"error": "error"});
        //     else response.send({"success": "success"});
        //});
    }
    catch (e)  {
        // console.log(e);
        // response.send({"error": "error in your request"});
    }
});


//ter.post('/manifest', (request: express.Request, response: express.Response) => {
//     // add options for flatting and reversing the override form manifest <- configuration to 
//     // manifest -> configurations
//     // split up object.assign to the end of the method and do so as specified by options

//     var requestedManifest = request.body;
//     let flatten = false; 
//     if(!isNullOrUndefined(requestedManifest.options)){
//         flatten = requestedManifest.options.flatten; 
//     }
//     console.log(flatten);
//     // check if manifest exists and grab data
//     // if(requestedManifest.manifest) { 
//     //     // query database
//     //     var result = {};
//     //     Object.assign(result,requestedManifest);
//     // }
//     // Object.assign with manifest object and request manifest
//     //let configs = await configurationHandler.getConfigurationByManfiest(requestedManifest.configurations, 
//                                                                     //requestedManifest.transforms, 
//                                                                     //flatten);
//     //response.send(configs);
// })

export = router;
