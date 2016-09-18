"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRepository_1 = require("./BaseRepository");
var ConfigurationSchema_1 = require("../db/schema/ConfigurationSchema");
var ConfigurationRepository = (function (_super) {
    __extends(ConfigurationRepository, _super);
    function ConfigurationRepository() {
        _super.call(this, ConfigurationSchema_1["default"]);
    }
    return ConfigurationRepository;
}(BaseRepository_1["default"]));
exports.__esModule = true;
exports["default"] = ConfigurationRepository;
//# sourceMappingURL=ConfigurationRepository.js.map