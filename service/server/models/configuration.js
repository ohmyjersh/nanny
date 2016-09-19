"use strict";
// import * as mongoose from "mongoose";
const db_1 = require("../config/db");
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configuration: Object
});
schema.static("findAllByName", (name) => {
    return exports.Configuration
        .findOne({ name: name })
        .lean()
        .exec();
});
exports.Configuration = db_1.mongoose.model("Configuration", schema);
//# sourceMappingURL=configuration.js.map