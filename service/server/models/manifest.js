"use strict";
const db_1 = require("../config/db");
let manifestSchema = new db_1.mongoose.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configuration: Object,
    transform: Object,
    options: Object
}, { timestamps: true });
exports.Manifest = db_1.mongoose.model("Manifest", manifestSchema);
//# sourceMappingURL=manifest.js.map