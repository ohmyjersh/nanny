"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const format = require("string-template");
const configuration_1 = require("../handlers/configuration");
const manifest_1 = require("../handlers/manifest");
const utils_1 = require("../utils/utils");
class GeneratorHandler {
    constructor() {
        this._configurationHandler = new configuration_1.default();
        this._manfiestHandler = new manifest_1.default();
    }
    generateConfiguration(requestManifest, requestConfigurations, transforms, options = { flatten: false, configOverride: true }) {
        var configResults = {};
        var manifestResults = {};
        // if request contains a manfiest, go get it
        if (!utils_1.default.isNullOrUndefined(requestManifest)) {
            Object.assign(manifestResults, this.mapManifestToConfigurations(requestManifest));
        }
        // if request contains configurations, go get it
        if (requestConfigurations > 0) {
            Object.assign(configResults, this.mapResultsToConfigurations(requestConfigurations));
        }
        return this.transformResultsToConfigs(manifestResults, configResults, transforms, options);
        // merge the to results sets 
        // make method to take everything to generate configs
        // return configs and object assign with validation errors from manifest and config grabbing.
        return configResults;
    }
    mapResultsToConfigurations(requestedConfigurations) {
        return __awaiter(this, void 0, void 0, function* () {
            var results = { validationErrors: [] };
            for (var config in requestedConfigurations) {
                var result = yield this._configurationHandler.getByName(requestedConfigurations[config]);
                Object.assign(results, result.configurations);
            }
        });
    }
    mapManifestToConfigurations(requestedManifest) {
        return __awaiter(this, void 0, void 0, function* () {
            var results = { validationErrors: [] };
            var result = yield this._manfiestHandler.getByName(requestedManifest);
            Object.assign(results, result);
        });
    }
    transformResultsToConfigs(manifestResults, configResults, transforms, options) {
        let configResponse = Object.assign(this.mergeManifestAndConfig(manifestResults, configResults, options.configOverride));
        // Object.assign configurations
        if (options.flatten) {
            Object.assign(configResults, this.flattenConfigurations(configResponse));
        }
        return configResponse;
    }
    mergeManifestAndConfig(manifestResults = {}, configResults = {}, configOverride) {
        if (configOverride) {
            return Object.assign(configResults, manifestResults);
        }
        return Object.assign(manifestResults, configResults);
    }
    flattenConfigurations(configurations) {
        var flatConfig = {};
        for (var configuration in configurations) {
            for (var key in configurations[configuration]) {
                Object.assign(flatConfig, { [key]: configurations[configuration][key] });
            }
        }
        return flatConfig;
    }
    transformConfigData(config, transformer) {
        return format(config, transformer);
    }
    addValidationErrors() {
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GeneratorHandler;
//# sourceMappingURL=generator.js.map