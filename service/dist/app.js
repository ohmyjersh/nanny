///<reference path="../typings/index.d.ts"/>
"use strict";
var bodyParser = require("body-parser");
var configurationRoutes = require("./routes/ConfigurationRoutes");
var manifestRoutes = require("./routes/ManifestRoutes");
var generateConfigurationRoutes = require("./routes/GenerateConfigurationRoutes");
var requestLogger = require("./middleware/requestLogger");
var NannyApi = (function () {
    function NannyApi(app, port) {
        this.app = app;
        this.port = port;
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }
    NannyApi.prototype.configureMiddleware = function (app) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(requestLogger);
    };
    NannyApi.prototype.configureRoutes = function (app) {
        app.use("/configuration", configurationRoutes);
        app.use("/manifest", manifestRoutes);
        app.use("/users", manifestRoutes);
        app.use("/generateconfiguration", generateConfigurationRoutes);
    };
    NannyApi.prototype.run = function () {
        this.app.listen(this.port);
    };
    return NannyApi;
}());
exports.NannyApi = NannyApi;
//# sourceMappingURL=app.js.map