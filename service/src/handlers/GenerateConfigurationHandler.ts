import ManifestRepository from '../repository/ManifestRepository';
import ConfigurationRepository from '../repository/ConfigurationRepository';

class GenerateConfigurationHandler {
    private _manifestRepository: ManifestRepository;
    private _configurationRepository:ConfigurationRepository;
    constructor() {
        this._manifestRepository = new ManifestRepository();
        this._configurationRepository = new ConfigurationRepository();
    }
    generateConfiguration() {
        //
    }
}

Object.seal(GenerateConfigurationHandler);
export default GenerateConfigurationHandler;