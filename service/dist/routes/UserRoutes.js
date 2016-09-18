"use strict";
var express = require("express");
var UserHandler_1 = require("../handlers/UserHandler");
var userHandler = new UserHandler_1["default"]();
var router = express.Router();
router.post('/', function (request, response) {
    try {
        var manifest = request.body;
        userHandler.create(manifest, function (error, result) {
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
router.get('/{id}', function (request, response) {
    try {
        var _id = request.params._id;
        userHandler.findById(_id, function (error, result) {
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
        userHandler.retrieve(function (error, result) {
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
        userHandler.update(_id, manifest, function (error, result) {
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
        userHandler.delete(_id, function (error, result) {
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
//# sourceMappingURL=UserRoutes.js.map