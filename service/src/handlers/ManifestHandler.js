"use strict";
const ManifestRepository_1 = require("../repository/ManifestRepository");
class ManifestHandler {
    constructor() {
        this._manifestRepository = new ManifestRepository_1.default();
    }
    create(item, callback) {
        this._manifestRepository.create(item, callback);
    }
    retrieve(callback) {
        this._manifestRepository.retrieve(callback);
    }
    update(_id, item, callback) {
        this._manifestRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else
                this._manifestRepository.update(_id, item, callback);
        });
    }
    delete(_id, callback) {
        this._manifestRepository.delete(_id, callback);
    }
    findById(_id, callback) {
        this._manifestRepository.findById(_id, callback);
    }
}
Object.seal(ManifestHandler);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ManifestHandler;
