"use strict";
const db_1 = require("../config/db");
let configurationSchema = new db_1.mongoose.Schema({
    title: String,
    configuration: String,
    raw: String
}, { timestamps: true });
exports.Configuration = db_1.mongoose.model('Configuration', configurationSchema);
//# sourceMappingURL=configuration.js.map