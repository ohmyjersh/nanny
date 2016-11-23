"use strict";
const express = require("express");
const body_parser_1 = require("body-parser");
const generator_1 = require("./routes/generator");
const configuration_1 = require("./routes/configuration");
const manifest_1 = require("./routes/manifest");
const authentication_1 = require("./routes/authentication");
const User_1 = require("./routes/User");
const app = express();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.get("/", (request, response) => {
    response.json({
        name: "Express application"
    });
});
app.use((err, request, response, next) => {
    response.status(err.status || 500);
    response.json({
        error: "Server error"
    });
});
app.use("/api", new authentication_1.AuthenticationRouter().getRouter(), new configuration_1.ConfigurationRouter().getRouter(), new manifest_1.ManifestRouter().getRouter(), new generator_1.GeneratorRouter().getRouter(), new User_1.UserRouter().getRouter());
const server = app.listen(3003);
exports.server = server;
//# sourceMappingURL=app.js.map