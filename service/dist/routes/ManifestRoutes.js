"use strict";
var express = require("express");
var ManifestHandler_1 = require("../handlers/ManifestHandler");
var manifestHandler = new ManifestHandler_1["default"]();
var router = express.Router();
router.post('/', function (request, response) {
    try {
        request.body = { name: "hi", configurations: (_a = {}, _a["what"] = "thing", _a) };
        var manifest = request.body;
        manifestHandler.create(manifest, function (error, result) {
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
        manifestHandler.findById(_id, function (error, result) {
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
        manifestHandler.retrieve(function (error, result) {
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
        var manifest = request.body;
        var _id = request.params._id;
        manifestHandler.update(_id, manifest, function (error, result) {
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
        manifestHandler.delete(_id, function (error, result) {
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
//# sourceMappingURL=ManifestRoutes.js.map