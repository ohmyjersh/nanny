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
    generateConfiguration(requestManifest:string,requestConfigurations:any,transforms:any,options = {flatten:false, configOverride:true}) {
        var configResults = {};
        var manifestResults = {};

        // if request contains a manfiest, go get it
        if(!Util.isNullOrUndefined(requestManifest)) {
            Object.assign(manifestResults,this.mapManifestToConfigurations(requestManifest));
        }
        // if request contains configurations, go get it
        if(requestConfigurations > 0) {
             Object.assign(configResults,this.mapResultsToConfigurations(requestConfigurations));
        }

        return this.transformResultsToConfigs(manifestResults, configResults, transforms, options);

        // merge the to results sets 

        // make method to take everything to generate configs
        // return configs and object assign with validation errors from manifest and config grabbing.
        return configResults;
    }

    private async mapResultsToConfigurations(requestedConfigurations) {
        var results = {validationErrors:[]};
        for(var config in requestedConfigurations){
            var result = await this._configurationHandler.getByName(requestedConfigurations[config])
            Object.assign(results,result.configurations);
        }
    }

    private async mapManifestToConfigurations(requestedManifest) {
        var results = {validationErrors:[]};
        var result = await this._manfiestHandler.getByName(requestedManifest)
        Object.assign(results,result);
    }

    public transformResultsToConfigs(manifestResults, configResults, transforms, options) {
        let configResponse = Object.assign(this.mergeManifestAndConfig(manifestResults,configResults, options.configOverride));

        // Object.assign configurations
        if(options.flatten) {
            Object.assign(configResults,this.flattenConfigurations(configResponse));
        }
        return configResponse;
    }

    public mergeManifestAndConfig(manifestResults={}, configResults={}, configOverride:boolean) {
        if(configOverride) {
            return Object.assign(configResults, manifestResults)
        }
        return Object.assign(manifestResults, configResults)
    }

    public flattenConfigurations(configurations) {
        var flatConfig = {};
        for(var configuration in configurations) {
            for(var key in configurations[configuration]){                
                Object.assign(flatConfig,{[key]:configurations[configuration][key]})
            }
        }
        return flatConfig;
    }
    public transformConfigData(config: string, transformer: Object) : String {
        return format(config, transformer);
    }
    private addValidationErrors() {

    }
} 
