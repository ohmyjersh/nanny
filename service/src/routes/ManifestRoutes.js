"use strict";
const express = require("express");
const ManifestHandler_1 = require("../handlers/ManifestHandler");
var manifestHandler = new ManifestHandler_1.default();
let router = express.Router();
router.post('/', (request, response) => {
    try {
        request.body = { name: "hi", configurations: { ["what"]: "thing" } };
        var manifest = request.body;
        manifestHandler.create(manifest, (error, result) => {
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
        manifestHandler.findById(_id, (error, result) => {
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
        manifestHandler.retrieve((error, result) => {
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
        manifestHandler.update(_id, manifest, (error, result) => {
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
        manifestHandler.delete(_id, (error, result) => {
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
