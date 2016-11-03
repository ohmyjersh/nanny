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
    generateConfiguration(requestManifest, requestConfigurations, transforms = {}, options = { flatten: false, configOverride: true }) {
        var configResults = {};
        var manifestResults = {};
        var validationErrors = [];
        // if request contains a manfiest, go get it
        if (!utils_1.default.isNullOrUndefined(requestManifest)) {
            Object.assign(manifestResults, this.mapManifestToConfigurations(requestManifest));
        }
        // if request contains configurations, go get it
        if (requestConfigurations > 0) {
            Object.assign(configResults, this.mapResultsToConfigurations(requestConfigurations));
        }
        var results = this.transformResultsToConfigs(manifestResults, configResults, transforms, options);
        if (validationErrors.length > 0) {
            Object.assign(results, this.addValidationErrors(results, validationErrors));
        }
        return results;
    }
    mapResultsToConfigurations(requestedConfigurations) {
        return __awaiter(this, void 0, void 0, function* () {
            var results = { validationErrors: [] };
            for (var config in requestedConfigurations) {
                var result = yield this._configurationHandler.getByName(requestedConfigurations[config]);
                Object.assign({}, results, result.configuration);
            }
            return results;
        });
    }
    mapManifestToConfigurations(requestedManifest) {
        return __awaiter(this, void 0, void 0, function* () {
            var results = { validationErrors: [] };
            try {
                var result = yield this._manfiestHandler.getByName(requestedManifest);
                Object.assign(results, result);
            }
            catch (ex) {
                results.validationErrors.push(`Unable to fetch manfiest: ${requestedManifest}`);
                console.log(ex);
            }
            return results;
        });
    }
    transformResultsToConfigs(manifestResults, configResults, transforms, options) {
        let configResponse = Object.assign(this.mergeManifestAndConfig(manifestResults, configResults, options.configOverride));
        Object.assign(configResponse, this.transformConfigs(configResponse, transforms));
        if (options.flatten) {
            configResponse = this.flattenConfigurations(configResponse);
        }
        return configResponse;
    }
    mergeManifestAndConfig(manifestResults = {}, configResults = {}, configOverride) {
        if (configOverride) {
            return Object.assign(configResults, manifestResults);
        }
        else {
            return Object.assign(manifestResults, configResults);
        }
    }
    flattenConfigurations(configurations) {
        let flatConfig = {};
        for (let configuration in configurations) {
            for (let key in configurations[configuration]) {
                Object.assign(flatConfig, { [key]: configurations[configuration][key] });
            }
        }
        return flatConfig;
    }
    transformConfigs(configurations, transformer) {
        for (let configuration in configurations) {
            let config = {};
            for (let key in configurations[configuration]) {
                config[key] = format(configurations[configuration][key], transformer);
            }
            Object.assign(configurations[configuration], config);
        }
        return configurations;
    }
    addValidationErrors(configs, validationErrors) {
        return Object.assign(configs, validationErrors);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GeneratorHandler;
//# sourceMappingURL=generator.js.map