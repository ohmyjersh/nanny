import ManifestHandler from './ManifestHandler';
import ConfigurationHandler from './ConfigurationHandler';

class GenerateConfigurationHandler {
    private _manifestHandler: ManifestHandler;
    private _configurationHandler:ConfigurationHandler;
    constructor() {
        this._manifestHandler = new ManifestHandler();
        this._configurationHandler= new ConfigurationHandler();
    }
    generateConfiguration(manifest:any, configuration:Object, options:Object) {
        //get manifest if not null
        var manfiest = this._manifestHandler.findByName(manifest.name, null);
    }
}

Object.seal(GenerateConfigurationHandler);
export default GenerateConfigurationHandler;