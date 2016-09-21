"use strict";
// import * as mongoose from "mongoose";
const db_1 = require("../config/db");
let configurationSchema = new db_1.mongoose.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configuration: Object
}, { timestamps: true });
exports.Configuration = db_1.mongoose.model('Configuration', configurationSchema);
//# sourceMappingURL=configuration.js.map