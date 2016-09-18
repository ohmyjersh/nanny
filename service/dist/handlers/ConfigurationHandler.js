"use strict";
var ConfigurationRepository_1 = require("../repository/ConfigurationRepository");
var ConfigurationHandler = (function () {
    function ConfigurationHandler() {
        this._configurationRepository = new ConfigurationRepository_1["default"]();
    }
    ConfigurationHandler.prototype.create = function (item, callback) {
        this._configurationRepository.create(item, callback);
    };
    ConfigurationHandler.prototype.retrieve = function (callback) {
        this._configurationRepository.retrieve(callback);
    };
    ConfigurationHandler.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._configurationRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._configurationRepository.update(_id, item, callback);
        });
    };
    ConfigurationHandler.prototype.delete = function (_id, callback) {
        this._configurationRepository.delete(_id, callback);
    };
    ConfigurationHandler.prototype.findById = function (_id, callback) {
        this._configurationRepository.findById(_id, callback);
    };
    return ConfigurationHandler;
}());
Object.seal(ConfigurationHandler);
exports.__esModule = true;
exports["default"] = ConfigurationHandler;
//# sourceMappingURL=ConfigurationHandler.js.map