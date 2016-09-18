"use strict";
const DataAccess = require("./../db");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
class UserSchema {
    schema() {
        var schema = mongoose.Schema({
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        });
        return schema;
    }
}
exports.UserSchema = UserSchema;
var schema = mongooseConnection.model("Users", new UserSchema().schema());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = schema;
