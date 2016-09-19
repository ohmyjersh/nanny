import * as mongoose from "mongoose";
import mockgoose = require("mockgoose");

(<any>mongoose).Promise = global.Promise;

if (process.env.NODE_ENV === "testing") {
    mockgoose(mongoose).then((): void => { mongoose.connect("mongodb://example.com/TestingDB") });
} else {
    mongoose.connect("mongodb://127.0.0.1/incomm");
}

export { mongoose };