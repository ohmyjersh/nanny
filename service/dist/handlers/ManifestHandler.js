"use strict";
var ManifestRepository_1 = require("../repository/ManifestRepository");
var ManifestHandler = (function () {
    function ManifestHandler() {
        this._manifestRepository = new ManifestRepository_1["default"]();
    }
    ManifestHandler.prototype.create = function (item, callback) {
        this._manifestRepository.create(item, callback);
    };
    ManifestHandler.prototype.retrieve = function (callback) {
        this._manifestRepository.retrieve(callback);
    };
    ManifestHandler.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._manifestRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._manifestRepository.update(_id, item, callback);
        });
    };
    ManifestHandler.prototype.delete = function (_id, callback) {
        this._manifestRepository.delete(_id, callback);
    };
    ManifestHandler.prototype.findById = function (_id, callback) {
        this._manifestRepository.findById(_id, callback);
    };
    return ManifestHandler;
}());
Object.seal(ManifestHandler);
exports.__esModule = true;
exports["default"] = ManifestHandler;
//# sourceMappingURL=ManifestHandler.js.map