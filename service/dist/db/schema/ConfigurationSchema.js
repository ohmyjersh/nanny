"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseSchema_1 = require("./BaseSchema");
var ConfigurationSchema = (function (_super) {
    __extends(ConfigurationSchema, _super);
    function ConfigurationSchema() {
        _super.apply(this, arguments);
    }
    ConfigurationSchema.prototype.schema = function () {
        var schema = this.mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            configurations: {
                type: { String: String },
                required: true
            }
        });
        return schema;
    };
    return ConfigurationSchema;
}(BaseSchema_1["default"]));
exports.ConfigurationSchema = ConfigurationSchema;
var schema = new BaseSchema_1["default"]().buildSchema("configurations", ConfigurationSchema);
exports.__esModule = true;
exports["default"] = schema;
//# sourceMappingURL=ConfigurationSchema.js.map