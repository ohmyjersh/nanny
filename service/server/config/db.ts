import * as mongoose from "mongoose";
mongoose.connect("mongodb://localhost:32768/incomm");
//mongoose.connect("mongodb://127.0.0.1:27017/incomm");
//mongoose.connect("mongodb://127.0.0.1:32769/incomm");

export { mongoose };