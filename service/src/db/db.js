"use strict";
const Mongoose = require("mongoose");
const Constants = require("./config");
class DB {
    constructor() {
        DB.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Connect to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(Constants.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
DB.connect();
module.exports = DB;
