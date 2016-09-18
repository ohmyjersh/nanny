"use strict";
const DataAccess = require("./../db");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
class ManifestSchema {
    schema() {
        var schema = mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            configurations: {
                type: { String: String },
                required: true
            },
            transforms: {
                type: { String: String },
                require: true
            },
            options: {
                type: { String: String },
                require: false
            }
        });
        return schema;
    }
}
exports.ManifestSchema = ManifestSchema;
var schema = mongooseConnection.model("Manifests", new ManifestSchema().schema());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = schema;
