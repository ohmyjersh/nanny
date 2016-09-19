"use strict";
const express = require("express");
const body_parser_1 = require("body-parser");
const generate_1 = require("./routes/generate");
const configuration_1 = require("./routes/configuration");
const manifest_1 = require("./routes/manifest");
const app = express();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({
    extended: true
}));
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
app.use("/api", new configuration_1.ConfigurationRouter().getRouter());
app.use("/api", new manifest_1.ManifestRouter().getRouter());
app.use("/api", new generate_1.GenerateRouter().getRouter());
const server = app.listen(3003);
exports.server = server;
//# sourceMappingURL=app.js.map