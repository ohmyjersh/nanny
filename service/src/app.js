///<reference path="../typings/index.d.ts"/>
"use strict";
var bodyParser = require("body-parser");
const configurationRoutes = require("./routes/ConfigurationRoutes");
const manifestRoutes = require("./routes/ManifestRoutes");
const generateConfigurationRoutes = require("./routes/GenerateConfigurationRoutes");
const requestLogger = require("./middleware/requestLogger");
class NannyApi {
    constructor(app, port) {
        this.app = app;
        this.port = port;
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }
    configureMiddleware(app) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(requestLogger);
    }
    configureRoutes(app) {
        app.use("/configuration", configurationRoutes);
        app.use("/manifest", manifestRoutes);
        app.use("/users", manifestRoutes);
        app.use("/generateconfiguration", generateConfigurationRoutes);
    }
    run() {
        this.app.listen(this.port);
    }
}
exports.NannyApi = NannyApi;
