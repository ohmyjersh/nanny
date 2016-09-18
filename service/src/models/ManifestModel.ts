import IManifestModel from "./interfaces/IManifestModel";

class ManifestModel  {
    private _manifestModel: IManifestModel
    constructor(configurationModel: IManifestModel) {
         this._manifestModel = configurationModel;
     }
}

Object.seal(ManifestModel);
export default ManifestModel;