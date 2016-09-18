"use strict";
const express = require("express");
const manifestHandler_1 = require("../handlers/manifestHandler");
const configurationHandler_1 = require("../handlers/configurationHandler");
var configurationHandler = new configurationHandler_1.default();
var manifestHandler = new manifestHandler_1.default();
let router = express.Router();
router.post('/', (request, response) => {
    try {
        request.body = { name: "hi", configurations: { ["what"]: "thing" } };
        var configuration = request.body;
        configurationHandler.create(configuration, (error, result) => {
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
        configurationHandler.findById(_id, (error, result) => {
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
        configurationHandler.retrieve((error, result) => {
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
        var configuration = request.body;
        var _id = request.params._id;
        configurationHandler.update(_id, configuration, (error, result) => {
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
        configurationHandler.delete(_id, (error, result) => {
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
