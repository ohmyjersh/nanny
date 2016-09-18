"use strict";
const ConfigurationRepository_1 = require("../repository/ConfigurationRepository");
class ConfigurationHandler {
    constructor() {
        this._configurationRepository = new ConfigurationRepository_1.default();
    }
    create(item, callback) {
        this._configurationRepository.create(item, callback);
    }
    retrieve(callback) {
        this._configurationRepository.retrieve(callback);
    }
    update(_id, item, callback) {
        this._configurationRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else
                this._configurationRepository.update(_id, item, callback);
        });
    }
    delete(_id, callback) {
        this._configurationRepository.delete(_id, callback);
    }
    findById(_id, callback) {
        this._configurationRepository.findById(_id, callback);
    }
}
Object.seal(ConfigurationHandler);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfigurationHandler;
