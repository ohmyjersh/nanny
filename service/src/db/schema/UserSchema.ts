import DataAccess = require("./../db");
import IUserModel from "./../../models/interfaces/IUserModel";

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

export class UserSchema { 
    schema () {
       var schema =  mongoose.Schema({
           username : {
               type: String,
               required: true
           },
           email: {
               type: String,
               required: true
           }
       });
       
       return schema;
   }
   
}

var schema = mongooseConnection.model<IUserModel>("Users", new UserSchema().schema());
export default schema;