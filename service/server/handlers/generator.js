"use strict";
const configuration_1 = require("../handlers/configuration");
const manifest_1 = require("../handlers/manifest");
class GeneratorHandler {
    constructor() {
        this._configurationHandler = new configuration_1.default();
        this._manfiestHandler = new manifest_1.default();
    }
    generateConfiguration(request) {
        // if request contains a manfiest, go get it
        // if request contains configurations, go get it
        // Object.assign configurations
        // flatten if options specify
        // return configurations
    }
    mapResultsToConfigurations() {
    }
    flattenConfigurations() {
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GeneratorHandler;
//# sourceMappingURL=generator.js.map