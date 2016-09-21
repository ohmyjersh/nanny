"use strict";
const db_1 = require("../config/db");
const mongoose_1 = require("mongoose");
let schema = new mongoose_1.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configuration: Object,
    transform: Object,
    options: Object
}, { timestamps: true });
exports.Manifest = db_1.mongoose.model("Manifest", schema);
//# sourceMappingURL=manifest.js.map