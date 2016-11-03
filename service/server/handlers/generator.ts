const format = require("string-template");
import ConfigurationHandler from "../handlers/configuration";
import { Configuration } from "../models/configuration";
import ManifestHandler from "../handlers/manifest";
import Util from "../utils/utils";

export default class GeneratorHandler {
    private _configurationHandler: ConfigurationHandler;
    private _manfiestHandler: ManifestHandler;
    constructor() {
        this._configurationHandler = new ConfigurationHandler();
        this._manfiestHandler = new ManifestHandler();
    }
    generateConfiguration(requestManifest: string, requestConfigurations: any, transforms = {}, options = { flatten: false, configOverride: true }) {
        var configResults = {};
        var manifestResults = {};
        var validationErrors = [];
        // if request contains a manfiest, go get it
        if (!Util.isNullOrUndefined(requestManifest)) {
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

    private async mapResultsToConfigurations(requestedConfigurations) {
        var results = { validationErrors: [] };
        for (var config in requestedConfigurations) {
            var result = await this._configurationHandler.getByName(requestedConfigurations[config])
            Object.assign({},results, result.configuration);
        }
        return results;
    }

    private async mapManifestToConfigurations(requestedManifest) {
        var results = { validationErrors: [] };
        try {
            var result = await this._manfiestHandler.getByName(requestedManifest)
            Object.assign(results, result);
        }
        catch (ex) {
            results.validationErrors.push(`Unable to fetch manfiest: ${requestedManifest}`);
            console.log(ex);
        }
        return results;
    }

    public transformResultsToConfigs(manifestResults, configResults, transforms, options) {

        let configResponse = Object.assign(this.mergeManifestAndConfig(manifestResults, configResults, options.configOverride));
        Object.assign(configResponse, this.transformConfigs(configResponse, transforms));
        if (options.flatten) {
            configResponse = this.flattenConfigurations(configResponse);
        }
        return configResponse;
    }

    public mergeManifestAndConfig(manifestResults = {}, configResults = {}, configOverride: boolean) {
        if (configOverride) {
            return Object.assign(configResults, manifestResults)
        } else {
            return Object.assign(manifestResults, configResults)
        }
    }

    public flattenConfigurations(configurations) {
        let flatConfig = {};
        for (let configuration in configurations) {
            for (let key in configurations[configuration]) {
                Object.assign(flatConfig, { [key]: configurations[configuration][key] })
            }
        }
        return flatConfig;
    }

    public transformConfigs(configurations: Object, transformer: Object) {

        for (let configuration in configurations) {
            let config = {};
            for (let key in configurations[configuration]) {
                config[key] = format(configurations[configuration][key], transformer)
            }
            Object.assign(configurations[configuration], config);
        }
        return configurations;
    }
    private addValidationErrors(configs, validationErrors) {
        return Object.assign(configs, validationErrors);
    }
}
