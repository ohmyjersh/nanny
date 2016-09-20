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
    configuration: Object,
    transform: Object,
    options: Object
}, { timestamps: true });
schema.static("findByName", (name) => {
    return exports.Manifest
        .findOne({ name: name })
        .lean()
        .exec();
});
exports.Manifest = db_1.mongoose.model("Manifest", schema);
//# sourceMappingURL=manifest.js.map