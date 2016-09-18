"use strict";
var express = require("express");
var manifestHandler_1 = require("../handlers/manifestHandler");
var configurationHandler_1 = require("../handlers/configurationHandler");
var configurationHandler = new configurationHandler_1["default"]();
var manifestHandler = new manifestHandler_1["default"]();
var router = express.Router();
router.post('/', function (request, response) {
    try {
        request.body = { name: "hi", configurations: (_a = {}, _a["what"] = "thing", _a) };
        var configuration = request.body;
        configurationHandler.create(configuration, function (error, result) {
            if (error)
                response.send({ "error": "error" });
            else
                response.send({ "success": "success" });
        });
    }
    catch (e) {
        console.log(e);
        response.send({ "error": "error in your request" });
    }
    var _a;
});
router.get('/{id}', function (request, response) {
    try {
        var _id = request.params._id;
        configurationHandler.findById(_id, function (error, result) {
            if (error)
                response.send({ "error": "error" });
            else
                response.send(result);
        });
    }
    catch (e) {
        console.log(e);
        response.send({ "error": "error in your request" });
    }
});
router.get('/', function (request, response) {
    try {
        configurationHandler.retrieve(function (error, result) {
            if (error)
                response.send({ "error": "error" });
            else
                response.send(result);
        });
    }
    catch (e) {
        console.log(e);
        response.send({ "error": "error in your request" });
    }
});
router.put('/{id}', function (request, response) {
    try {
        var configuration = request.body;
        var _id = request.params._id;
        configurationHandler.update(_id, configuration, function (error, result) {
            if (error)
                response.send({ "error": "error" });
            else
                response.send({ "success": "success" });
        });
    }
    catch (e) {
        console.log(e);
        response.send({ "error": "error in your request" });
    }
});
router.delete('/{id}', function (request, response) {
    try {
        var _id = request.params._id;
        configurationHandler.delete(_id, function (error, result) {
            if (error)
                response.send({ "error": "error" });
            else
                response.send({ "success": "success" });
        });
    }
    catch (e) {
        console.log(e);
        response.send({ "error": "error in your request" });
    }
});
module.exports = router;
//# sourceMappingURL=ConfigurationRoutes.js.map