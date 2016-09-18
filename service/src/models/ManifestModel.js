"use strict";
class ManifestModel {
    constructor(configurationModel) {
        this._manifestModel = configurationModel;
    }
}
Object.seal(ManifestModel);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ManifestModel;
