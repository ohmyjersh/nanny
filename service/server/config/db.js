"use strict";
const mongoose = require("mongoose");
exports.mongoose = mongoose;
// import mockgoose = require("mockgoose");
//(<any>mongoose).Promise = global.Promise;
// if (process.env.NODE_ENV === "testing") {
//     mockgoose(mongoose).then((): void => { mongoose.connect("mongodb://example.com/TestingDB") });
// } else {
mongoose.connect("mongodb://127.0.0.1:27017/incomm");
//# sourceMappingURL=db.js.map