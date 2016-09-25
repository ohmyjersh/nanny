"use strict";
const db_1 = require("../config/db");
let configurationSchema = new db_1.mongoose.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configurations: { String: String }
}, { timestamps: true });
exports.Configuration = db_1.mongoose.model('Configuration', configurationSchema);
//export type ConfigurationModel = Model<IConfiguration> & IConfigurationModel;
//export const Configuration: ConfigurationModel = <ConfigurationModel>mongoose.model<IConfiguration>("Configuration", configurationSchema); 
//# sourceMappingURL=configuration.js.map