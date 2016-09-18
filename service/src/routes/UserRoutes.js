"use strict";
const express = require("express");
const UserHandler_1 = require("../handlers/UserHandler");
var userHandler = new UserHandler_1.default();
let router = express.Router();
router.post('/', (request, response) => {
    try {
        var manifest = request.body;
        userHandler.create(manifest, (error, result) => {
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
router.get('/{id}', (request, response) => {
    try {
        var _id = request.params._id;
        userHandler.findById(_id, (error, result) => {
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
router.get('/', (request, response) => {
    try {
        userHandler.retrieve((error, result) => {
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
router.put('/{id}', (request, response) => {
    try {
        var manifest = request.body;
        var _id = request.params._id;
        userHandler.update(_id, manifest, (error, result) => {
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
router.delete('/{id}', (request, response) => {
    try {
        var _id = request.params._id;
        userHandler.delete(_id, (error, result) => {
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
