"use strict";
const DataAccess = require("./../db");
class BaseSchema {
    constructor() {
        this.mongoose = DataAccess.mongooseInstance;
        this.mongooseConnection = DataAccess.mongooseConnection;
    }
    buildSchema(collection, schema) {
        return this.mongooseConnection.model("Configurations", new schema().schema());
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseSchema;
