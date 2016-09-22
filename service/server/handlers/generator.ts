import ConfigurationHandler from "../handlers/configuration";
import ManifestHandler from "../handlers/manifest";

export default class GeneratorHandler {
    private _configurationHandler: ConfigurationHandler;
    private _manfiestHandler: ManifestHandler;
    constructor() {
        this._configurationHandler = new ConfigurationHandler();
        this._manfiestHandler = new ManifestHandler();
    }
    generateConfiguration(request:Object) {
        // if request contains a manfiest, go get it
        // if request contains configurations, go get it
        // Object.assign configurations
        // flatten if options specify
        // return configurations
    }
    private mapResultsToConfigurations() {

    }
    private flattenConfigurations() {

    }
} 