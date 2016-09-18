
import DataAccess = require("./../db");
import IConfigurationModel from "./../../models/interfaces/IConfigurationModel";


export default class BaseSchema {
    mongoose = DataAccess.mongooseInstance;
    mongooseConnection = DataAccess.mongooseConnection;

    buildSchema(collection:string, schema:any){
       return this.mongooseConnection.model("Configurations", new schema().schema());
    }
}