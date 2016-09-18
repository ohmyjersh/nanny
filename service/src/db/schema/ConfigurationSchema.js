"use strict";
const BaseSchema_1 = require("./BaseSchema");
class ConfigurationSchema extends BaseSchema_1.default {
    schema() {
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
    }
}
exports.ConfigurationSchema = ConfigurationSchema;
var schema = new BaseSchema_1.default().buildSchema("configurations", ConfigurationSchema);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = schema;
