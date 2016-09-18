"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRepository_1 = require("./BaseRepository");
var ConfigurationSchema_1 = require("../db/schema/ConfigurationSchema");
var ManifestRepository = (function (_super) {
    __extends(ManifestRepository, _super);
    function ManifestRepository() {
        _super.call(this, ConfigurationSchema_1["default"]);
    }
    return ManifestRepository;
}(BaseRepository_1["default"]));
exports.__esModule = true;
exports["default"] = ManifestRepository;
//# sourceMappingURL=ManifestRepository.js.map