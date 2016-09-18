///<reference path="../typings/index.d.ts"/>

import express = require("express");
var bodyParser = require("body-parser");
import configurationRoutes = require("./routes/ConfigurationRoutes");
import manifestRoutes = require("./routes/ManifestRoutes");
import userRoutes = require("./routes/UserRoutes");
import generateConfigurationRoutes = require("./routes/GenerateConfigurationRoutes");
import requestLogger = require("./middleware/requestLogger");
export class NannyApi {
    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }
    private configureMiddleware(app: express.Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(requestLogger);
    }
    private configureRoutes(app: express.Express) {
        app.use("/configuration", configurationRoutes);
        app.use("/manifest", manifestRoutes);
        app.use("/users", manifestRoutes);
        app.use("/generateconfiguration", generateConfigurationRoutes);
    }
    public run() {
        this.app.listen(this.port);
    }
}