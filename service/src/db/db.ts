import Mongoose = require("mongoose");
import Constants = require("./config");

class DB {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    
    constructor () {
        DB.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Connect to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(Constants.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}

DB.connect();
export = DB;
     