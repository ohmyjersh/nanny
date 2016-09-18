import DataAccess = require("./../db");
import IConfigurationModel from "./../../models/interfaces/IManifestModel";

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

export class ManifestSchema { 
    schema () {
       var schema =  mongoose.Schema({
           name : {
               type: String,
               required: true
           },
           configurations: {
               type: {String:String},
               required: true
           },
           transforms: {
               type: {String:String},
               require:true
           },
           options: {
               type: {String:String},
               require:false
           }
       });
       
       return schema;
   }
   
}

var schema = mongooseConnection.model<IManifestModel>("Manifests", new ManifestSchema().schema());
export default schema;