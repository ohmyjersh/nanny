"use strict";
var DataAccess = require("./../db");
var BaseSchema = (function () {
    function BaseSchema() {
        this.mongoose = DataAccess.mongooseInstance;
        this.mongooseConnection = DataAccess.mongooseConnection;
    }
    BaseSchema.prototype.buildSchema = function (collection, schema) {
        return this.mongooseConnection.model("Configurations", new schema().schema());
    };
    return BaseSchema;
}());
exports.__esModule = true;
exports["default"] = BaseSchema;
//# sourceMappingURL=BaseSchema.js.map