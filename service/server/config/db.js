"use strict";
const mongoose = require("mongoose");
exports.mongoose = mongoose;
const mockgoose = require("mockgoose");
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "testing") {
    mockgoose(mongoose).then(() => { mongoose.connect("mongodb://example.com/TestingDB"); });
}
else {
    mongoose.connect("mongodb://127.0.0.1/incomm");
}
//# sourceMappingURL=db.js.map