"use strict";
const db_1 = require("../config/db");
let manifestSchema = new db_1.mongoose.Schema({
    title: String,
    manifest: String,
    raw: String
}, { timestamps: true });
exports.Manifest = db_1.mongoose.model("Manifest", manifestSchema);
//# sourceMappingURL=manifest.js.map