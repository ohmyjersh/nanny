"use strict";
var Mongoose = require("mongoose");
var Constants = require("./config");
var DB = (function () {
    function DB() {
        DB.connect();
    }
    DB.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", function () {
            console.log("Connect to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(Constants.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    return DB;
}());
DB.connect();
module.exports = DB;
//# sourceMappingURL=db.js.map