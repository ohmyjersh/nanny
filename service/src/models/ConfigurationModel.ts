import IConfigurationModel from "./interfaces/IConfigurationModel";

class ConfigurationModel  {
    private _configurationModel: IConfigurationModel
    constructor(configurationModel: IConfigurationModel) {
         this._configurationModel = configurationModel;
     }
}

Object.seal(ConfigurationModel);
export default ConfigurationModel;